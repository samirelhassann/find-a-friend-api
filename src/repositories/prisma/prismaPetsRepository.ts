import { PetsRepository } from "../petsRepository";
import { prisma } from "@/lib/prisma";
import { Pet, Prisma, QuantityLevel, Size } from "@prisma/client";

export class PrismaPetsRepository implements PetsRepository {
  async findById(petId: string): Promise<Pet | null> {
    return prisma.pet.findUnique({
      where: { id: petId },
    });
  }

  async findMany(
    page: number,
    pageSize: number,
    city: string,
    age?: number,
    size?: Size,
    energyLevel?: QuantityLevel,
    independencyLevel?: QuantityLevel,
    environment?: string
  ) {
    const conditionals = [];

    if (age) {
      conditionals.push({ age: { equals: age } });
    }

    if (size) {
      conditionals.push({ size: { equals: size } });
    }

    if (energyLevel) {
      conditionals.push({ energy_level: { equals: energyLevel } });
    }

    if (independencyLevel) {
      conditionals.push({ independency_level: { equals: independencyLevel } });
    }

    if (environment) {
      conditionals.push({ environment: { equals: environment } });
    }

    if (city) {
      conditionals.push({
        user: {
          address: {
            city: {
              name: {
                contains: city,
              },
            },
          },
        },
      });
    }

    return prisma.pet.findMany({
      where: {
        AND: conditionals,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const user = await prisma.pet.create({
      data,
    });

    return user;
  }

  async delete(petId: string) {
    await prisma.pet.delete({
      where: { id: petId },
    });
  }

  async update(pet: Pet) {
    await prisma.pet.update({
      where: { id: pet.id },
      data: pet,
    });

    return pet;
  }
}
