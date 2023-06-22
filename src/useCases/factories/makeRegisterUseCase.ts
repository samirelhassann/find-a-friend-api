import { RegisterUseCase } from "../users/registerUseCase";
import { PrismaAddressesRepository } from "@/repositories/prisma/prismaAddressesRepository";
import { PrismaCitiesRepository } from "@/repositories/prisma/prismaCitiesRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeRegisterUseCase() {
  const citiesRepository = new PrismaCitiesRepository();
  const addressesRepository = new PrismaAddressesRepository();
  const usersRepository = new PrismaUsersRepository();

  const useCase = new RegisterUseCase(
    citiesRepository,
    addressesRepository,
    usersRepository
  );

  return useCase;
}
