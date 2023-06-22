import { FindPetUseCase } from "../pets/findPetUseCase";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository";

export function makeFindPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new FindPetUseCase(petsRepository);

  return useCase;
}
