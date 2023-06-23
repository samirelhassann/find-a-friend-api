import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import createUserAndAuthenticate from "@/utils/test/createUserAndAuthenticate";

describe("CreateCityController e2e", () => {
  const propsMock = {
    name: "city",
    state: "state",
  };

  let token = "";

  beforeAll(async () => {
    await app.ready();

    token = await createUserAndAuthenticate(app, true);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create the city", async () => {
    const response = await request(app.server)
      .post("/cities")
      .set({ Authorization: `Bearer ${token}` })
      .send(propsMock);

    expect(response.status).toBe(201);
    expect(response.body.city).toEqual(expect.objectContaining(propsMock));
  });
});
