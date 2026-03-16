import { InternalServerError } from "@/common/errors/httpErrors";
import config from "../../../config";
import logger from "../../../config/logger";
import type {
  NasaFetchResult,
  NasaServiceOptions,
  NeoFeedQuery,
  NasaServiceType,
} from "./nasa.types";
import axios, { isAxiosError } from "axios";

class NasaService {
  private apiKey: string;
  private baseUrl: string;
  private timeoutMs: number;
  private axiosInstance: ReturnType<typeof axios.create>;

  constructor(options: NasaServiceOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl;
    this.timeoutMs = options.timeoutMs;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeoutMs,
      headers: { Accept: "application/json" },
      params: { api_key: this.apiKey },
    });
  }

  private async fetchFromNasa<T>(
    pathname: string,
    params: object,
  ): Promise<NasaFetchResult<T>> {
    try {
      const response = await this.axiosInstance.get<T>(pathname, { params });
      return { data: response.data };
    } catch (error) {
      // Use Axios's built-in type guard instead of manual checking
      if (!isAxiosError(error)) {
        logger.error("Unexpected error calling NASA API", {
          error: error instanceof Error ? error.message : "Unknown error",
          pathname,
        });
        throw new InternalServerError("Unexpected error while contacting NASA API");
      }

      // Timeout
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        logger.warn("NASA API request timed out", {
          pathname,
          timeout: this.timeoutMs,
        });
        throw new InternalServerError(`NASA API request timed out after ${this.timeoutMs}ms`,);
      }

      // Upstream responded with an error status
      if (error.response) {
        const { status, data } = error.response;
        logger.warn("NASA API returned error", {
          pathname,
          status,
          data,
        });
        const message =
          typeof data?.error_message === "string"
            ? data.error_message
            : `NASA API responded with ${status}`;
        throw new InternalServerError(message);
      }

      logger.warn("NASA API unreachable", {
        pathname,
        code: error.code,
        message: error.message,
      });
      throw new InternalServerError( "Failed to reach NASA API");
    }
  }

  // NASA endpoint methods
  public fetchApod(date?: string) {
    return this.fetchFromNasa("/planetary/apod", { date });
  }

  public async fetchNeoFeed(params: NeoFeedQuery) {
    // Fetch raw data from NASA
    const result = await this.fetchFromNasa<any>("/neo/rest/v1/feed", params);
    const safeData = result.data || { near_earth_objects: {} };
    // Transform to chartData: [{ date, count }]
    const chartData = safeData.near_earth_objects
      ? Object.entries(safeData.near_earth_objects).map(([date, neos]) => ({
          date,
          count: Array.isArray(neos) ? neos.length : 0,
        }))
      : [];

    const totalNEOs = chartData.reduce((sum, d) => sum + d.count, 0);
    const days = chartData.length;
    const avgPerDay = days ? Number((totalNEOs / days).toFixed(1)) : 0;

    return {
      data: {
        chartData,
        totalNEOs,
        days,
        avgPerDay,
      },
    };
  }
}

const nasaService: NasaServiceType = new NasaService({
  apiKey: config.nasaApiKey,
  baseUrl: config.nasaBaseUrl,
  timeoutMs: config.nasaTimeoutMs,
});

export default nasaService;
