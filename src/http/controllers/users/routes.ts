import { FastifyInstance } from "fastify";

import { AuthenticateController } from "./authenticateController";
import { RefreshController } from "./refreshController";
import { RegisterController } from "./registerController";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", RegisterController);

  app.post("/login", AuthenticateController);
  app.patch("/token/refresh", RefreshController);
}
