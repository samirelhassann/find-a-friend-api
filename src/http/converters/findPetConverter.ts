import { FindPetResponse } from "../model/FindPetResponse";
import { FindPetUseCaseResponse } from "@/useCases/pets/findPetUseCase";

const findPetConverter = (data: FindPetUseCaseResponse): FindPetResponse => ({
  id: data.pet.id,
  name: data.pet.name,
  about: data.pet.about,
  age: data.pet.age,
  size: data.pet.size,
  energyLevel: data.pet.energy_level,
  independencyLevel: data.pet.independency_level,
  environment: data.pet.environment,
  createdAt: data.pet.created_at,
});

export default findPetConverter;
