import { CityAlreadyExistsError } from "../errors/cityAlreadyExistsError";
import { CitiesRepository } from "@/repositories/citiesRepository";
import { City } from "@prisma/client";

interface CreateCityUseCaseRequest {
  name: string;
  state: string;
}

interface CreateCityUseCaseResponse {
  city: City;
}

export class CreateCityUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute({
    name,
    state,
  }: CreateCityUseCaseRequest): Promise<CreateCityUseCaseResponse> {
    {
      const hasCity = await this.citiesRepository.findByName(name);

      if (hasCity) {
        throw new CityAlreadyExistsError(name);
      }

      const city = await this.citiesRepository.create({
        name,
        state,
      });

      return { city };
    }
  }
}
