import { expect, it, describe, beforeEach } from "vitest";

import { CreateCityUseCase } from "./createCityUseCase";
import { InMemoryCitiesRepository } from "@/repositories/inMemory/inMemoryCitiesRepository";

let cityRepository: InMemoryCitiesRepository;
let sut: CreateCityUseCase;

describe("Given the createCityUseCase", () => {
  const propsMock = {
    name: "name",
    state: "state",
  };

  beforeEach(() => {
    cityRepository = new InMemoryCitiesRepository();
    sut = new CreateCityUseCase(cityRepository);
  });

  it("should be able to create a city", async () => {
    const { city } = await sut.execute({ ...propsMock });

    expect(city).toEqual(expect.objectContaining(propsMock));
  });
});
