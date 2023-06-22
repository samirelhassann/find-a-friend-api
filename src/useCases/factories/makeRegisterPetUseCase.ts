import { RegisterPetUseCase } from "../pets/registerPetUseCase";
import { PrismaPetRequirementRepository } from "@/repositories/prisma/prismaPetRequirementRepository";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeRegisterPetUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const petsRepository = new PrismaPetsRepository();
  const petRequirement = new PrismaPetRequirementRepository();
  const useCase = new RegisterPetUseCase(
    usersRepository,
    petsRepository,
    petRequirement
  );

  return useCase;
}
