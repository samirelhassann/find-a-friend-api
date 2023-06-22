import { UsersRepository } from "../usersRepository";
import { User, Prisma } from "@prisma/client";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((u) => u.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = {
      id: `user-${Math.random().toString(36).substring(7)}`,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cellphone_number: data.cellphone_number ?? null,
      role: data.role ?? "USER",
      address_id: data.address_id ?? null,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
