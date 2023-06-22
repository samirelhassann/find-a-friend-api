import { PetsRepository } from "@/repositories/petsRepository";
import { Pet } from "@prisma/client";

interface FindPetsUseCaseRequest {
  page: number;
  pageSize: number;
  city: string;
  age?: number;
  size?: string;
  energyLevel?: string;
  independencyLevel?: string;
  environment?: string;
}

export interface FindPetsUseCaseResponse {
  pets: Pet[];
}

export class FindPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    page,
    pageSize,
    age,
    size,
    energyLevel,
    independencyLevel,
    environment,
    city,
  }: FindPetsUseCaseRequest): Promise<FindPetsUseCaseResponse> {
    {
      const pets = await this.petsRepository.findMany(
        page,
        pageSize,
        city,
        age,
        size,
        energyLevel,
        independencyLevel,
        environment
      );

      return { pets };
    }
  }
}
