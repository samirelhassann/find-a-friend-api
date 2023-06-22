import { CitiesRepository } from "../citiesRepository";
import { Prisma, City } from "@prisma/client";

export class InMemoryCitiesRepository implements CitiesRepository {
  public items: City[] = [];

  async findById(cityId: string) {
    const city = this.items.find((u) => u.id === cityId);

    if (!city) {
      return null;
    }

    return city;
  }

  async findByName(name: string) {
    const city = this.items.find((u) => u.name === name);

    if (!city) {
      return null;
    }

    return city;
  }

  async create(data: Prisma.CityCreateInput) {
    const city = {
      id: `city-${Math.random().toString(36).substring(7)}`,
      name: data.name,
      state: data.state,
      created_at: new Date(),
    };

    this.items.push(city);

    return city;
  }

  async delete(cityId: string) {
    this.items = this.items.filter((u) => u.id !== cityId);
  }

  async update(city: City) {
    this.items = this.items.map((ci) => {
      if (ci.id === city.id) {
        return city;
      }

      return ci;
    });

    return city;
  }
}
