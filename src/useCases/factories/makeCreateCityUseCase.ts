import { CreateCityUseCase } from "../cities/createCityUseCase";
import { PrismaCitiesRepository } from "@/repositories/prisma/prismaCitiesRepository";

export function makeCreateCityUseCase() {
  const citiesRepository = new PrismaCitiesRepository();
  const useCase = new CreateCityUseCase(citiesRepository);

  return useCase;
}
