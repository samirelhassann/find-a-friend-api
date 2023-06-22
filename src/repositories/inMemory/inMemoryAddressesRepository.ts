import { AddressesRepository } from "../addressessRepository";
import { Prisma, Address } from "@prisma/client";

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = [];

  async findById(addressId: string) {
    const address = this.items.find((u) => u.id === addressId);

    if (!address) {
      return null;
    }

    return address;
  }

  async findByName(name: string) {
    const address = this.items.find(
      (u) => u.street === name || u.complement === name
    );

    if (!address) {
      return null;
    }

    return address;
  }

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: `address-${Math.random().toString(36).substring(7)}`,
      street: data.street,
      zip_code: data.zip_code,
      complement: data.complement ?? null,
      city_id: data.city_id,
      created_at: new Date(),
    };

    this.items.push(address);

    return address;
  }

  async delete(addressId: string) {
    this.items = this.items.filter((u) => u.id !== addressId);
  }

  async update(address: Address) {
    this.items = this.items.map((ci) => {
      if (ci.id === address.id) {
        return address;
      }

      return ci;
    });

    return address;
  }
}
