import { FastifyInstance } from "fastify";

import { CreateCityController } from "./createCityController";
import { RolesEnum } from "@/domains/enums/rolesEnum";
import verifyJwt from "@/http/middlewares/verifyJwt";

export async function cityRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt(RolesEnum.ADMIN));

  app.post("/", CreateCityController);
}
