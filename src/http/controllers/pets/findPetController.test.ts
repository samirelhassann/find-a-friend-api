import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
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
    const createdResponse = await request(app.server)
      .post("/pets")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...petMockCreate, name: "pet-1" });

    const createdPetId = createdResponse.body.id;

    const response = await request(app.server).get(`/pets/${createdPetId}`);

    expect(response.body).toStrictEqual(
      expect.objectContaining({
        id: createdPetId,
        name: "pet-1",
        age: 2,
        about: "about",
        size: "SMALL",
      })
    );
  });
});
