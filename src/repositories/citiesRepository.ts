import { City, Prisma } from "@prisma/client";

export interface CitiesRepository {
  findById(cityId: string): Promise<City | null>;

  findByName(name: string): Promise<City | null>;

  create(data: Prisma.CityCreateInput): Promise<City>;

  delete(cityId: string): void;

  update(city: City): Promise<City>;
}
