export class CityAlreadyExistsError extends Error {
  constructor(cityName: string) {
    super(`City ${cityName} already exist`);
  }
}
