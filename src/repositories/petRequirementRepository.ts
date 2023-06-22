import { PetRequirement, Prisma } from "@prisma/client";

export interface PetRequirementRepository {
  findById(petId: string): Promise<PetRequirement | null>;

  create(
    data: Prisma.PetRequirementUncheckedCreateInput
  ): Promise<PetRequirement>;

  delete(petRequirementId: string): void;

  update(data: PetRequirement): Promise<PetRequirement>;
}
