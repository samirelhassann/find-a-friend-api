import { Address, Prisma } from "@prisma/client";

export interface AddressesRepository {
  findById(addressId: string): Promise<Address | null>;

  findByName(name: string): Promise<Address | null>;

  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>;

  delete(addressId: string): void;

  update(city: Address): Promise<Address>;
}
