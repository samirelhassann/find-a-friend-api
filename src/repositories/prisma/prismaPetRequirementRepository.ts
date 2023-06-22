import { PetRequirementRepository } from "../petRequirementRepository";
import { prisma } from "@/lib/prisma";
import { PetRequirement, Prisma } from "@prisma/client";

export class PrismaPetRequirementRepository
  implements PetRequirementRepository
{
  async findById(pRequirement: string): Promise<PetRequirement | null> {
    return prisma.petRequirement.findUnique({
      where: { id: pRequirement },
    });
  }

  async create(data: Prisma.PetRequirementUncheckedCreateInput) {
    const pRequirement = await prisma.petRequirement.create({
      data,
    });

    return pRequirement;
  }

  async delete(pRequirement: string) {
    await prisma.petRequirement.delete({
      where: { id: pRequirement },
    });
  }

  async update(pet: PetRequirement) {
    await prisma.petRequirement.update({
      where: { id: pet.id },
      data: pet,
    });

    return pet;
  }
}
