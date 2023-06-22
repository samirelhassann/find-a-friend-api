import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import findPetConverter from "@/http/converters/findPetConverter";
import { makeFindPetUseCase } from "@/useCases/factories/makeFindPetUseCase";

export async function FindPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const schema = z.object({
    petId: z.string(),
  });

  await makeFindPetUseCase()
    .execute({
      ...schema.parse(request.params),
    })
    .then((response) => reply.status(200).send(findPetConverter(response)));
}
