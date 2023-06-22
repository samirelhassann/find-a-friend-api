/* eslint-disable consistent-return */
import { FastifyReply, FastifyRequest } from "fastify";

import { RolesEnum } from "@/domains/enums/rolesEnum";

const verifyJwt = (roleToVerify?: RolesEnum) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();

      if (roleToVerify && request.user.role !== roleToVerify) {
        throw new Error();
      }
    } catch (e) {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }
  };
};

export default verifyJwt;
