import { CitiesRepository } from "../citiesRepository";
import { prisma } from "@/lib/prisma";
import { City, Prisma } from "@prisma/client";

export class PrismaCitiesRepository implements CitiesRepository {
  async findById(cityId: string) {
    return prisma.city.findUnique({
      where: { id: cityId },
    });
  }

  async findByName(name: string) {
    return prisma.city.findUnique({
      where: { name },
    });
  }

  async create(data: Prisma.CityCreateInput) {
    const user = await prisma.city.create({
      data,
    });

    return user;
  }

  async delete(cityId: string) {
    return prisma.city.delete({
      where: { id: cityId },
    });
  }

  async update(city: City) {
    return prisma.city.update({
      where: { id: city.id },
      data: city,
    });
  }
}
