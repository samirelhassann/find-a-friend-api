import {
  FindPetsResponse,
  FindPetsResponseItem,
} from "../model/FindPetsResponse";
import { FindPetsUseCaseResponse } from "@/useCases/pets/findPetsUseCase";

const findPetsConverter = (
  data: FindPetsUseCaseResponse
): FindPetsResponse => ({
  pets: data.pets.map(
    (value): FindPetsResponseItem => ({
      id: value.id,
      name: value.name,
      about: value.about,
      age: value.age,
      size: value.size,
      energyLevel: value.energy_level,
      independencyLevel: value.independency_level,
      environment: value.environment,
      createdAt: value.created_at,
    })
  ),
});

export default findPetsConverter;
