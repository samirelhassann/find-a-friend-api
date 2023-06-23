import { hash } from "bcryptjs";
import { expect, it, describe, beforeEach } from "vitest";

import { InvalidCredentialsError } from "../errors/invalidCredentialsError";
import { AuthenticateUseCase } from "./authenticateUseCase";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Given the Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 5),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "johndoe@example.com",
        name: "John Doe",
      })
    );
  });

  it("should not be able to authenticate with nonexistent email", async () => {
    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe2@example.com",
      password_hash: await hash("123456", 5),
    });

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("1234567", 5),
    });

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
