import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { QuantityLevel } from "@/domains/enums/quantityLevelEnum";
import { makeRegisterPetUseCase } from "@/useCases/factories/makeRegisterPetUseCase";
import { Size } from "@prisma/client";

export async function RegisterPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.number(),
    size: z.nativeEnum(Size),
    energyLevel: z.nativeEnum(QuantityLevel),
    independencyLevel: z.nativeEnum(QuantityLevel),
    environment: z.string(),
    requirements: z.string().array().optional(),
  });

  const { sub: userId } = request.user;

  await makeRegisterPetUseCase()
    .execute({ ...bodySchema.parse(request.body), userId })
    .then(() => reply.status(201).send());
}
