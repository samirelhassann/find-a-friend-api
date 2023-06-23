import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import createUserAndAuthenticate from "@/utils/test/createUserAndAuthenticate";

describe("RegisterPetController e2e", () => {
  let token = "";

  beforeAll(async () => {
    await app.ready();

    token = await createUserAndAuthenticate(app, false);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a pet", async () => {
    const response = await request(app.server)
      .post("/pets")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "pet",
        age: 2,
        about: "about",
        size: "SMALL",
        energyLevel: "HIGH",
        independencyLevel: "MEDIUM",
        environment: "Normal",
        requirements: ["req1"],
      });

    expect(response.status).toBe(201);
  });
});
