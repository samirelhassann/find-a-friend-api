import { PetsRepository } from "../petsRepository";
import { Prisma, Pet } from "@prisma/client";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findById(petId: string): Promise<Pet | null> {
    return this.items.find((u) => u.id === petId) ?? null;
  }

  async findMany(
    page: number,
    pageSize: number,
    city: string,
    age?: number,
    size?: string,
    energyLevel?: string,
    independencyLevel?: string,
    environment?: string
  ): Promise<Pet[]> {
    return (
      this.items
        .filter(
          (c) =>
            (!age || c.age === age) &&
            (!size || c.size === size) &&
            (!energyLevel || c.energy_level === energyLevel) &&
            (!independencyLevel ||
              c.independency_level === independencyLevel) &&
            (!environment || c.environment === environment)
        )
        .slice((page - 1) * pageSize, page * pageSize) ?? []
    );
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: `pet-${Math.random().toString(36).substring(7)}`,
      name: data.name,
      about: data.about,
      age: data.age,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      size: data.size,
      environment: data.environment,
      user_id: data.user_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async delete(petId: string) {
    this.items = this.items.filter((u) => u.id !== petId);
  }

  async update(pet: Pet): Promise<Pet> {
    this.items = this.items.map((u) => {
      if (u.id === pet.id) {
        return pet;
      }

      return u;
    });

    return pet;
  }
}
