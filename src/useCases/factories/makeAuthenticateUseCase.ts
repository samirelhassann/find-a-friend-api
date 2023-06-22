import { AuthenticateUseCase } from "../users/authenticateUseCase";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase;
}
