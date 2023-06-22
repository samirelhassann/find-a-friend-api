import { AddressesRepository } from "../addressessRepository";
import { prisma } from "@/lib/prisma";
import { Address, Prisma } from "@prisma/client";

export class PrismaAddressesRepository implements AddressesRepository {
  async findById(addressId: string) {
    return prisma.address.findUnique({
      where: { id: addressId },
    });
  }

  async findByName(name: string) {
    return prisma.address.findFirst({
      where: {
        OR: [
          {
            street: {
              contains: name,
            },
          },
          {
            complement: {
              contains: name,
            },
          },
        ],
      },
    });
  }

  async create(data: Prisma.AddressUncheckedCreateInput) {
    return prisma.address.create({
      data,
    });
  }

  async delete(addressId: string) {
    return prisma.address.delete({
      where: { id: addressId },
    });
  }

  async update(address: Address) {
    return prisma.address.update({
      where: { id: address.id },
      data: address,
    });
  }
}
