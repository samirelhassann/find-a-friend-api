export class PetNotFoundError extends Error {
  constructor() {
    super("Pet not founded");
  }
}
