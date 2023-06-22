import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { RolesEnum } from "@/domains/enums/rolesEnum";
import { makeRegisterUseCase } from "@/useCases/factories/makeRegisterUseCase";

export async function RegisterController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.nativeEnum(RolesEnum).default(RolesEnum.USER),
      cellphoneNumber: z.string().optional(),
      address: z
        .object({
          cityName: z.string(),
          street: z.string(),
          zipCode: z.string(),
          complement: z.string().optional(),
        })
        .optional(),
    })
    .refine(
      (data) => {
        if (data.role === RolesEnum.ORG && !data.address) {
          return false;
        }
        return true;
      },
      {
        message: `Address must be provided when role is '${RolesEnum.ORG}'`,
      }
    )
    .refine(
      (data) => {
        if (data.role === RolesEnum.ORG && !data.cellphoneNumber) {
          return false;
        }
        return true;
      },
      {
        message: `'cellphoneNumber' must be provided when role is '${RolesEnum.ORG}'`,
      }
    );

  await makeRegisterUseCase()
    .execute({ ...bodySchema.parse(request.body) })
    .then(() => reply.status(201).send());
}
