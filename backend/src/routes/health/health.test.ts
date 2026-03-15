import app from "@/app";
import supertest from "supertest";

import * as healthService from "./health.service";

//Test case for /health.
describe("GET /api/health", () => {
  it("Test GET /health returns 200 and expected payload.", async () => {
    const response = await supertest(app).get("/health").send({});

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body.status).toBe('ok');
  });

  it("should return 500 and error payload when health service fails", async () => {
    // Mock getHealthStatus to throw an error
    jest.spyOn(healthService, "getHealthStatus").mockImplementation(() => {
      throw new Error("Simulated health failure");
    });

    const response = await supertest(app).get("/health").send({});

    expect(response.status).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Internal Server Error");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Something went wrong");

    // Restore original implementation
    jest.restoreAllMocks();
  });
});
