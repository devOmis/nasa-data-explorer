import app from "@/app";
import supertest from "supertest";
import * as nasaController from "./nasa.controller";
import nasaService from "./nasa.service";
import axios from "axios";
import { apodQuerySchema, neoQuerySchema } from "./nasaSchemas";

jest.mock("axios");

const request = supertest(app);

const VALID_APOD_QUERY = "date=2024-01-01";
const VALID_NEO_QUERY = "start_date=2024-01-01&end_date=2024-01-02";

const MOCK_APOD_DATA = { title: "NASA Data", success: true };

const MOCK_NEO_DATA = {
  chartData: [
    { date: "2024-01-01", count: 2 },
    { date: "2024-01-02", count: 3 },
  ],
  totalNEOs: 5,
  days: 2,
  avgPerDay: 2.5,
};

const getApi = (path: string) => request.get(`/api/v1/nasa/${path}`);

const createMockRes = () =>
  ({
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as any);

const mockNext = jest.fn();

describe("NASA Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe("Integration: /api/v1/nasa", () => {
    describe("GET /apod", () => {
      it("returns 200 and data on success", async () => {
        jest
          .spyOn(nasaService, "fetchApod")
          .mockResolvedValue({ data: MOCK_APOD_DATA });

        const { status, body } = await getApi(`apod?${VALID_APOD_QUERY}`);

        expect(status).toBe(200);
        expect(body.data).toMatchObject(MOCK_APOD_DATA);
      });

      it("returns 500 when the service fails", async () => {
        jest
          .spyOn(nasaService, "fetchApod")
          .mockRejectedValue(new Error("Upstream Fail"));

        const { status } = await getApi(`apod?${VALID_APOD_QUERY}`);

        expect(status).toBe(500);
      });
    });

    describe("GET /neo", () => {
      it("returns 200 and data on success", async () => {
        jest
          .spyOn(nasaService, "fetchNeoFeed")
          .mockResolvedValue({ data: MOCK_NEO_DATA });

        const { status, body } = await getApi(`neo?${VALID_NEO_QUERY}`);

        expect(status).toBe(200);
        expect(body.data).toMatchObject(MOCK_NEO_DATA);
      });

      it("returns 500 when the service fails", async () => {
        jest
          .spyOn(nasaService, "fetchNeoFeed")
          .mockRejectedValue(new Error("Upstream Fail"));

        const { status } = await getApi(`neo?${VALID_NEO_QUERY}`);

        expect(status).toBe(500);
      });
    });

    it("returns 400 for invalid APOD date", async () => {
      const { status } = await getApi("apod?date=invalid");
      expect(status).toBe(400);
    });
  });

  describe("Controller: Unit Tests", () => {
    it("should call service and return JSON for APOD", async () => {
      const res = createMockRes();

      jest
        .spyOn(nasaService, "fetchApod")
        .mockResolvedValue({ data: MOCK_APOD_DATA });

      await nasaController.getApod(
        { query: { date: "2024-01-01" } } as any,
        res,
        mockNext
      );

      expect(res.json).toHaveBeenCalledWith({ data: MOCK_APOD_DATA });
    });

    it("should call service and return JSON for NEO", async () => {
      const res = createMockRes();

      jest
        .spyOn(nasaService, "fetchNeoFeed")
        .mockResolvedValue({ data: MOCK_NEO_DATA });

      await nasaController.getNeoFeed(
        {
          query: {
            start_date: "2024-01-01",
            end_date: "2024-01-02",
          },
        } as any,
        res,
        mockNext
      );

      expect(res.json).toHaveBeenCalledWith({ data: MOCK_NEO_DATA });
    });
  });

  describe("Service: Unit Tests", () => {
    let serviceInstance: any;

    beforeEach(() => {
      (axios.create as jest.Mock).mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: MOCK_APOD_DATA }),
      });

      serviceInstance = new (nasaService.constructor as any)({
        apiKey: "test",
        baseUrl: "test",
        timeoutMs: 100,
      });
    });

    it("fetches APOD data successfully via axios", async () => {
      const result = await serviceInstance.fetchApod("2024-01-01");

      expect(result.data).toEqual(MOCK_APOD_DATA);
    });

    it("fetches NEO data successfully via axios", async () => {
      const MOCK_NASA_RAW_NEO = {
        near_earth_objects: {
          "2024-01-01": [{}, {}],
          "2024-01-02": [{}, {}, {}],
        },
      };

      const EXPECTED_NEO_DATA = {
        chartData: [
          { date: "2024-01-01", count: 2 },
          { date: "2024-01-02", count: 3 },
        ],
        totalNEOs: 5,
        days: 2,
        avgPerDay: 2.5,
      };

      (serviceInstance.axiosInstance.get as jest.Mock).mockResolvedValueOnce({
        data: MOCK_NASA_RAW_NEO,
      });

      const result = await serviceInstance.fetchNeoFeed({
        start_date: new Date("2024-01-01"),
        end_date: new Date("2024-01-02"),
      });

      expect(result.data).toEqual(EXPECTED_NEO_DATA);
    });
  });

  describe("Schemas: Validation", () => {
    test.each([
      {
        schema: apodQuerySchema,
        data: { date: new Date() },
        shouldPass: true,
      },
      {
        schema: apodQuerySchema,
        data: { date: "garbage" },
        shouldPass: false,
      },
      {
        schema: neoQuerySchema,
        data: {
          start_date: new Date("2024-01-01"),
          end_date: new Date("2024-01-02"),
        },
        shouldPass: true,
      },
      {
        schema: neoQuerySchema,
        data: {
          start_date: new Date("2024-01-02"),
          end_date: new Date("2024-01-01"),
        },
        shouldPass: false,
      },
    ])("validates schema correctly", ({ schema, data, shouldPass }) => {
      const action = () => schema.parse(data);

      shouldPass
        ? expect(action).not.toThrow()
        : expect(action).toThrow();
    });
  });
});