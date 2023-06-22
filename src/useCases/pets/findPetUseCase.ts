import { PetNotFoundError } from "../errors/petNotFoundError";
import { PetsRepository } from "@/repositories/petsRepository";
import { Pet } from "@prisma/client";

interface FindPetUseCaseRequest {
  petId: string;
}

export interface FindPetUseCaseResponse {
  pet: Pet;
}

export class FindPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: FindPetUseCaseRequest): Promise<FindPetUseCaseResponse> {
    {
      const pet = await this.petsRepository.findById(petId);

      if (!pet) {
        throw new PetNotFoundError();
      }

      return { pet };
    }
  }
}
