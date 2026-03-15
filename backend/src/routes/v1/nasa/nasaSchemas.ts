import { z } from 'zod';

export const apodQuerySchema = z.object({
  date: z
    .coerce.date()
    .optional()
});

export const neoQuerySchema = z
  .object({
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return data.end_date > data.start_date;
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['end_date'],
    },
  )
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        // Difference in milliseconds, then convert to days
        const diff = (data.end_date.getTime() - data.start_date.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 6; // 7 days max (inclusive)
      }
      return true;
    },
    {
      message: 'Date range cannot exceed 7 days',
      path: ['end_date'],
    },
  )
  .refine(
    (data) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Ignore time part
      if (data.start_date && data.start_date > now) return false;
      if (data.end_date && data.end_date > now) return false;
      return true;
    },
    {
      message: 'Dates cannot be in the future',
      path: ['end_date'],
    },
  );