import { FindPetsUseCase } from "../pets/findPetsUseCase";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository";

export function makeFindPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new FindPetsUseCase(petsRepository);

  return useCase;
}
