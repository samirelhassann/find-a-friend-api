import { UsersRepository } from "../usersRepository";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
