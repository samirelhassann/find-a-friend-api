export class CityDoesNotExistError extends Error {
  constructor(cityName: string) {
    super(`City ${cityName} does not exist`);
  }
}
