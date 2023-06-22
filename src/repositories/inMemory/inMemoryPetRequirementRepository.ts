import { PetRequirementRepository } from "../petRequirementRepository";
import { Prisma, PetRequirement } from "@prisma/client";

export class InMemoryPetRequirementRepository
  implements PetRequirementRepository
{
  public items: PetRequirement[] = [];

  async findById(petRequirement: string) {
    return this.items.find((u) => u.id === petRequirement) ?? null;
  }

  async create(data: Prisma.PetRequirementUncheckedCreateInput) {
    const pRequirement = {
      id: `pRequirement-${Math.random().toString(36).substring(7)}`,
      requirement: data.requirement,
      pet_id: data.pet_id ?? null,
      created_at: new Date(),
    };

    this.items.push(pRequirement);

    return pRequirement;
  }

  async delete(pRequirementId: string) {
    this.items = this.items.filter((u) => u.id !== pRequirementId);
  }

  async update(pRequirement: PetRequirement) {
    this.items = this.items.map((ci) => {
      if (ci.id === pRequirement.id) {
        return pRequirement;
      }

      return ci;
    });

    return pRequirement;
  }
}
