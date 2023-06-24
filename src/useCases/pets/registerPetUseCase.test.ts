import { expect, it, describe, beforeEach } from "vitest";

import { UserDoesNotExistError } from "../errors/userDoesNotExistError";
import { RegisterPetUseCase } from "./registerPetUseCase";
import { QuantityLevel } from "@/domains/enums/quantityLevelEnum";
import { RolesEnum } from "@/domains/enums/rolesEnum";
import { Size } from "@/domains/enums/sizeEnum";
import { InMemoryPetRequirementRepository } from "@/repositories/inMemory/inMemoryPetRequirementRepository";
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let petsRepository: InMemoryPetsRepository;
let petRequirementRepository: InMemoryPetRequirementRepository;
let sut: RegisterPetUseCase;

describe("Given the registerPetUseCaseTest", () => {
  const propsMock = {
    name: "test-name",
    about: "test-about",
    age: 2,
    size: Size.MEDIUM,
    energyLevel: QuantityLevel.MEDIUM,
    independencyLevel: QuantityLevel.MEDIUM,
    environment: "test-environment",
    requirements: ["req1", "req2"],
  };

  const userPropsMock = {
    name: "userName",
    email: "test@email.com",
    password_hash: "123",
    cellphoneNumber: "111111",
    role: RolesEnum.ORG,
  };

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    petsRepository = new InMemoryPetsRepository();
    petRequirementRepository = new InMemoryPetRequirementRepository();

    sut = new RegisterPetUseCase(
      usersRepository,
      petsRepository,
      petRequirementRepository
    );
  });

  it("should be able to create a pet", async () => {
    const createdUser = await usersRepository.create(userPropsMock);

    const pet = await sut.execute({
      ...propsMock,
      userId: createdUser.id,
    });

    expect(pet).toStrictEqual(
      expect.objectContaining({
        about: "test-about",
        age: 2,
        energy_level: "MEDIUM",
        environment: "test-environment",
        independency_level: "MEDIUM",
        name: "test-name",
        size: "MEDIUM",
        user_id: createdUser.id,
      })
    );
  });

  it("should throw 'UserDoesNotExistError' when the user informed does not exists", async () => {
    await usersRepository.create(userPropsMock);

    expect(() =>
      sut.execute({
        ...propsMock,
        userId: "test",
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistError);
  });
});
