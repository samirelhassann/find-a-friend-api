import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { TEST_CITY } from "@/utils/test/constants";
import createUserAndAuthenticate from "@/utils/test/createUserAndAuthenticate";

describe("FindPetsController e2e", () => {
  let token = "";

  const petMockCreate = {
    age: 2,
    about: "about",
    size: "SMALL",
    energyLevel: "HIGH",
    independencyLevel: "MEDIUM",
    environment: "Normal",
    requirements: ["req1"],
  };

  beforeAll(async () => {
    await app.ready();

    token = await createUserAndAuthenticate(app, false);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should list the pets correctly", async () => {
    await request(app.server)
      .post("/pets")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...petMockCreate, name: "pet-1" });

    await request(app.server)
      .post("/pets")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...petMockCreate, name: "pet-2" });

    const response = await request(app.server).post("/pets/search").send({
      city: TEST_CITY,
    });

    expect(response.body.pets).length(2);
  });
});
