import { expect, it, describe, beforeEach } from "vitest";

import { FindPetsUseCase } from "./findPetsUseCase";
import { QuantityLevel } from "@/domains/enums/quantityLevelEnum";
import { Size } from "@/domains/enums/sizeEnum";
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository";

let petsRepository: InMemoryPetsRepository;
let sut: FindPetsUseCase;

describe("Given the findPetsUseCase", () => {
  const createPetMock = {
    name: "test-name",
    about: "test-about",
    age: 2,
    size: Size.MEDIUM,
    energy_level: QuantityLevel.MEDIUM,
    independency_level: QuantityLevel.MEDIUM,
    environment: "test-environment",
    requirements: ["req1", "req2"],
    user_id: "test-user-id",
  };

  const propsMock = {
    pageSize: 20,
    page: 1,
    city: "city",
  };

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();

    sut = new FindPetsUseCase(petsRepository);
  });

  it("should be able to list the pet correctly", async () => {
    Array.from({ length: 30 }).forEach(async (_, index) => {
      await petsRepository.create({
        ...createPetMock,
        name: `test-name-${index + 1}`,
      });
    });

    const { pets } = await sut.execute({
      ...propsMock,
    });

    expect(pets).length(20);
  });
});
