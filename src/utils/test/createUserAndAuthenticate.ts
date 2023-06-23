import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

import {
  TEST_CELLPHONE_NUMBER,
  TEST_CITY,
  TEST_STATE,
  TEST_STREET,
  TEST_ZIPCODE,
  USER_TEST_EMAIL,
  USER_TEST_NAME,
  USER_TEST_PASSWORD,
} from "./constants";
import { RolesEnum } from "@/domains/enums/rolesEnum";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const createUserAndAuthenticate = async (
  app: FastifyInstance,
  isAdmin = false
) => {
  let userToCreate: Prisma.UserUncheckedCreateInput = {
    name: USER_TEST_NAME,
    email: USER_TEST_EMAIL,
    password_hash: await hash(USER_TEST_PASSWORD, 6),
  };

  if (isAdmin) {
    userToCreate = { ...userToCreate, role: RolesEnum.ADMIN };
  } else {
    const { id: cityId } = await prisma.city.create({
      data: {
        name: TEST_CITY,
        state: TEST_STATE,
      },
    });

    const { id: addressId } = await prisma.address.create({
      data: {
        street: TEST_STREET,
        zip_code: TEST_ZIPCODE,
        city_id: cityId,
      },
    });

    userToCreate = {
      ...userToCreate,
      role: RolesEnum.ORG,
      cellphone_number: TEST_CELLPHONE_NUMBER,
      address_id: addressId,
    };
  }

  await prisma.user.create({ data: userToCreate });

  const authResponse = await request(app.server).post("/login").send({
    email: USER_TEST_EMAIL,
    password: USER_TEST_PASSWORD,
  });

  const { token } = authResponse.body;

  return token;
};

export default createUserAndAuthenticate;
