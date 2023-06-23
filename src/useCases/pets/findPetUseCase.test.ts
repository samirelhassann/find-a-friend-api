import { expect, it, describe, beforeEach } from "vitest";

import { PetNotFoundError } from "../errors/petNotFoundError";
import { FindPetUseCase } from "./findPetUseCase";
import { QuantityLevel } from "@/domains/enums/quantityLevelEnum";
import { Size } from "@/domains/enums/sizeEnum";
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository";

let petsRepository: InMemoryPetsRepository;
let sut: FindPetUseCase;

describe("Given the findPetUseCase", () => {
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

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();

    sut = new FindPetUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const createdPet = await petsRepository.create({
      ...createPetMock,
    });

    const { pet } = await sut.execute({ petId: createdPet.id });

    expect(pet).toStrictEqual(
      expect.objectContaining({
        name: createPetMock.name,
      })
    );
  });

  it("should throw 'PetNotFoundError' when the petId is not founded", async () => {
    await petsRepository.create({
      ...createPetMock,
    });

    expect(() => sut.execute({ petId: "test" })).rejects.toBeInstanceOf(
      PetNotFoundError
    );
  });
});
