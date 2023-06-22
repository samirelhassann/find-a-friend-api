import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { QuantityLevel } from "@/domains/enums/quantityLevelEnum";
import findPetsConverter from "@/http/converters/findPetsConverter";
import { makeFindPetsUseCase } from "@/useCases/factories/makeFindPetsUseCase";
import { Size } from "@prisma/client";

export async function FindPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const queryParamsSchema = z.object({
    page: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(20),
  });

  const bodySchema = z
    .object({
      age: z.number().optional(),
      size: z.nativeEnum(Size).optional(),
      energyLevel: z.nativeEnum(QuantityLevel).optional(),
      independencyLevel: z.nativeEnum(QuantityLevel).optional(),
      environment: z.string().optional(),
      city: z.string(),
    })
    .strict();

  await makeFindPetsUseCase()
    .execute({
      ...queryParamsSchema.parse(request.params),
      ...bodySchema.parse(request.body),
    })
    .then((response) => reply.status(200).send(findPetsConverter(response)));
}
