import { hash } from "bcryptjs";

import { CityDoesNotExistError } from "../errors/cityDoesNotExistError";
import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";
import { AddressesRepository } from "@/repositories/addressessRepository";
import { CitiesRepository } from "@/repositories/citiesRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { Role, User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  cellphoneNumber?: string;
  role: Role;
  address?: {
    cityName: string;
    street: string;
    zipCode: string;
    complement?: string;
  };
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(
    private citiesRepository: CitiesRepository,
    private addressesRepository: AddressesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    cellphoneNumber,
    role,
    address,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    {
      let addressId: string | undefined;

      const hasUser = await this.usersRepository.findByEmail(email);

      if (hasUser) {
        throw new UserAlreadyExistsError();
      }

      const passwordHash = await hash(password, 5);

      if (address) {
        const city = await this.citiesRepository.findByName(address.cityName);

        if (!city) {
          throw new CityDoesNotExistError(address.cityName);
        }

        const createdAddress = await this.addressesRepository.create({
          city_id: city.id,
          street: address.street,
          zip_code: address.zipCode,
          complement: address.complement,
        });

        addressId = createdAddress.id;
      }

      const user = await this.usersRepository.create({
        name,
        email,
        password_hash: passwordHash,
        cellphone_number: cellphoneNumber,
        role,
        address_id: addressId,
      });

      return { user };
    }
  }
}
