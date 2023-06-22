import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  findById(petId: string): Promise<Pet | null>;

  findMany(
    page: number,
    pageSize: number,
    city: string,
    age?: number,
    size?: string,
    energyLevel?: string,
    independencyLevel?: string,
    environment?: string
  ): Promise<Pet[]>;

  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;

  delete(petId: string): void;

  update(pet: Pet): Promise<Pet>;
}
