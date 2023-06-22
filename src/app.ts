import fastify from "fastify";
import { ZodError } from "zod";

import { env } from "./env";
import { cityRoutes } from "./http/controllers/cities/routes";
import { petsRoutes } from "./http/controllers/pets/routes";
import { usersRoutes } from "./http/controllers/users/routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(cityRoutes, { prefix: "/cities" });
app.register(petsRoutes, { prefix: "/pets" });

// Return errors for all routes
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    // eslint-disable-next-line consistent-return, array-callback-return
    const errors = error.issues.map((issue) => {
      if (issue.code === "invalid_type") {
        return `field(s) '${issue.path.join(
          ","
        )}' ${issue.message.toLowerCase()}`;
      }

      if (issue.code === "unrecognized_keys") {
        {
          return `field(s) '${issue.keys.join(",")}' not recognized`;
        }
      }
    });

    return reply.code(400).send({ message: "Validation error.", errors });
  }

  if (env.NODE_ENV !== "prod") {
    // eslint-disable-next-line no-console
    console.error(error);
  } else {
    // TODO: Add more details to the error
  }

  return reply.code(500).send({ message: error.message });
});
