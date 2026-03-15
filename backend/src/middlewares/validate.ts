import { BadRequestError } from "@/common/errors/httpErrors";
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ZodSchema } from "zod";

type RequestSource = "body" | "query" | "params";

const formatZodErrors = (error: ZodError) => {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return errors;
};


const assignToReqField = (
  req: Request,
  field: RequestSource,
  parsed: Record<string, any>
) => {
  const target = req[field] as Record<string, any>;
  // Clear existing keys
  for (const key of Object.keys(target)) {
    delete target[key];
  }
  // Assign parsed values (skip undefined)
  for (const [key, value] of Object.entries(parsed)) {
    if (value !== undefined) {
      target[key] = value;
    }
  }
};


export const validate =
  (schema: ZodSchema, source?: RequestSource) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = source
        ? req[source]
        : { body: req.body, query: req.query, params: req.params };

      const parsed = schema.parse(data);

      if (source) {
        assignToReqField(req, source, parsed as Record<string, any>);
      } else {
        const p = parsed as { body?: any; query?: any; params?: any };
        if (p.body) req.body = p.body;
        if (p.query) assignToReqField(req, "query", p.query);
        if (p.params) assignToReqField(req, "params", p.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatZodErrors(error);
        throw new BadRequestError(
          Object.values(errors).flat().join("; "),
          errors
        );
      }
      next(error);
    }
  };