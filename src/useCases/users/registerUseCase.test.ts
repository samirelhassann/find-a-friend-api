import { expect, it, describe, beforeEach } from "vitest";

import { CityDoesNotExistError } from "../errors/cityDoesNotExistError";
import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";
import { RegisterUseCase } from "./registerUseCase";
import { RolesEnum } from "@/domains/enums/rolesEnum";
import { InMemoryAddressesRepository } from "@/repositories/inMemory/inMemoryAddressesRepository";
import { InMemoryCitiesRepository } from "@/repositories/inMemory/inMemoryCitiesRepository";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let citiesRepository: InMemoryCitiesRepository;
let addressesRepository: InMemoryAddressesRepository;
let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Given the registerUseCase", () => {
  const propsMock = {
    name: "name",
    email: "email@email.com",
    password: "123",
    role: RolesEnum.ORG,
    address: {
      cityName: "cityName",
      street: "street",
      zipCode: "zipCode",
      complement: "complement",
    },
  };

  const propsCityCreateMock = {
    name: "cityName",
    state: "stateName",
  };

  beforeEach(() => {
    citiesRepository = new InMemoryCitiesRepository();
    addressesRepository = new InMemoryAddressesRepository();
    usersRepository = new InMemoryUserRepository();

    sut = new RegisterUseCase(
      citiesRepository,
      addressesRepository,
      usersRepository
    );
  });

  it("should be able to create a user", async () => {
    const createdCity = await citiesRepository.create(propsCityCreateMock);

    const { user } = await sut.execute(propsMock);

    const createdAddress = await addressesRepository.findByName(
      propsMock.address.street
    );

    expect(createdAddress?.city_id).toBe(createdCity.id);

    expect(user).toStrictEqual(
      expect.objectContaining({
        name: propsMock.name,
        email: propsMock.email,
        role: propsMock.role,
        address_id: createdAddress?.id,
      })
    );
  });

  it("should throw 'CityDoesNotExistError' when the user informed does not exists", async () => {
    await citiesRepository.create({ ...propsCityCreateMock, name: "test" });

    expect(() => sut.execute(propsMock)).rejects.toBeInstanceOf(
      CityDoesNotExistError
    );
  });

  it("should throw 'UserDoesNotExistError' when the user informed does not exists", async () => {
    await citiesRepository.create(propsCityCreateMock);

    await sut.execute(propsMock);

    expect(() => sut.execute(propsMock)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
