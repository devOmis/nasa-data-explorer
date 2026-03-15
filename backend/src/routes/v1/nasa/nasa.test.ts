import app from "@/app";
import supertest from "supertest";
import * as nasaController from "./nasa.controller";
import nasaService from "./nasa.service";
import axios from "axios";
import { apodQuerySchema, neoQuerySchema } from "./nasaSchemas";

jest.mock("axios");

const VALID_APOD_QUERY = "date=2024-01-01";
const VALID_NEO_QUERY = "start_date=2024-01-01&end_date=2024-01-02";
const MOCK_DATA = { title: "NASA Data", success: true };

const request = supertest(app);
const getApi = (path: string) => request.get(`/api/v1/nasa/${path}`);

describe("NASA Module", () => {
  // Global cleanup to prevent test bleed
  afterEach(() => jest.restoreAllMocks());

  describe("Integration: /api/v1/nasa", () => {
    
    describe.each([
      { 
        endpoint: "apod", 
        query: VALID_APOD_QUERY, 
        serviceMethod: "fetchApod" as const 
      },
      { 
        endpoint: "neo", 
        query: VALID_NEO_QUERY, 
        serviceMethod: "fetchNeoFeed" as const 
      },
    ])("GET /$endpoint", ({ endpoint, query, serviceMethod }) => {
      
      it("returns 200 and data on success", async () => {
        jest.spyOn(nasaService, serviceMethod).mockResolvedValue({ data: MOCK_DATA });
        
        const { status, body } = await getApi(`${endpoint}?${query}`);
        
        expect(status).toBe(200);
        expect(body.data).toMatchObject(MOCK_DATA);
      });

      it("returns 500 when the service fails", async () => {
        jest.spyOn(nasaService, serviceMethod).mockRejectedValue(new Error("Upstream Fail"));
        
        const { status } = await getApi(`${endpoint}?${query}`);
        
        expect(status).toBe(500);
      });
    });

    it("returns 400 for invalid APOD date", async () => {
      const { status } = await getApi("apod?date=invalid");
      expect(status).toBe(400);
    });
  });

  describe("Controller: Unit Tests", () => {
    const mockRes = () => ({ json: jest.fn(), status: jest.fn().mockReturnThis() } as any);
    const mockNext = jest.fn();

    it.each([
      { 
        method: nasaController.getApod, 
        svc: "fetchApod", 
        req: { query: { date: "2024-01-01" } } 
      },
      { 
        method: nasaController.getNeoFeed, 
        svc: "fetchNeoFeed", 
        req: { query: { start_date: "2024-01-01", end_date: "2024-01-02" } } 
      }
    ])("should call service and return JSON", async ({ method, svc, req }) => {
      const res = mockRes();
      jest.spyOn(nasaService, svc as any).mockResolvedValue({ data: MOCK_DATA });

      await method(req as any, res, mockNext);

      expect(res.json).toHaveBeenCalledWith({ data: MOCK_DATA });
    });
  });

  describe("Service: Unit Tests", () => {
    let serviceInstance: typeof nasaService;

    beforeEach(() => {
      (axios.create as jest.Mock).mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: MOCK_DATA })
      });
      serviceInstance = new (nasaService.constructor as any)({ 
        apiKey: "test", baseUrl: "test", timeoutMs: 100 
      });
    });

    it("fetches data successfully via axios", async () => {
      const result = await serviceInstance.fetchApod("2024-01-01");
      expect(result.data).toEqual(MOCK_DATA);
    });
  });

  describe("Schemas: Validation", () => {
    test.each([
      { schema: apodQuerySchema, data: { date: new Date() }, shouldPass: true },
      { schema: apodQuerySchema, data: { date: "garbage" }, shouldPass: false },
      { 
        schema: neoQuerySchema, 
        data: { start_date: new Date("2024-01-01"), end_date: new Date("2024-01-02") }, 
        shouldPass: true 
      },
      { 
        schema: neoQuerySchema, 
        data: { start_date: new Date("2024-01-02"), end_date: new Date("2024-01-01") }, 
        shouldPass: false 
      },
    ])("validates schema correctly", ({ schema, data, shouldPass }) => {
      const action = () => schema.parse(data);
      shouldPass ? expect(action).not.toThrow() : expect(action).toThrow();
    });
  });
});