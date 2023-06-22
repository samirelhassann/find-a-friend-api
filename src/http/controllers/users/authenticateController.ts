import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeAuthenticateUseCase } from "@/useCases/factories/makeAuthenticateUseCase";

export async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { user } = await makeAuthenticateUseCase().execute({
    ...authBodySchema.parse(request.body),
  });

  const token = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
        expiresIn: "1d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}
