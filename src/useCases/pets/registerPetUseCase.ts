import { UserDoesNotExistError } from "../errors/userDoesNotExistError";
import { PetRequirementRepository } from "@/repositories/petRequirementRepository";
import { PetsRepository } from "@/repositories/petsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { Pet, QuantityLevel, Size } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  about: string;
  age: number;
  size: Size;
  energyLevel: QuantityLevel;
  independencyLevel: QuantityLevel;
  environment: string;
  userId: string;
  requirements?: string[];
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private petsRepository: PetsRepository,
    private petRequirementsRepository: PetRequirementRepository
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    independencyLevel,
    environment,
    requirements,
    userId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    {
      const hasUser = await this.usersRepository.findById(userId);

      if (!hasUser) {
        throw new UserDoesNotExistError();
      }

      const pet = await this.petsRepository.create({
        name,
        about,
        age,
        size,
        energy_level: energyLevel,
        independency_level: independencyLevel,
        environment,
        user_id: userId,
      });

      requirements?.forEach(async (requirement) => {
        await this.petRequirementsRepository.create({
          requirement,
          pet_id: pet.id,
        });
      });

      return { pet };
    }
  }
}
