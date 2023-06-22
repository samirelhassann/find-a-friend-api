import { FastifyInstance } from "fastify";

import { FindPetController } from "./findPetController";
import { FindPetsController } from "./findPetsController";
import { RegisterPetController } from "./registerPetController";
import { RolesEnum } from "@/domains/enums/rolesEnum";
import verifyJwt from "@/http/middlewares/verifyJwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    "/",
    { onRequest: [verifyJwt(RolesEnum.ORG)] },
    RegisterPetController
  );

  app.post("/search", FindPetsController);
  app.get("/:petId", FindPetController);
}
