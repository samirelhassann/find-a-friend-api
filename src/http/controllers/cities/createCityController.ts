import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateCityUseCase } from "@/useCases/factories/makeCreateCityUseCase";

export async function CreateCityController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string(),
    state: z.string(),
  });

  await makeCreateCityUseCase()
    .execute({ ...bodySchema.parse(request.body) })
    .then((response) => {
      return reply.status(201).send(response);
    });
}
