import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetService } from "@/services/get.service";
import { FastifyReply, FastifyRequest } from "fastify";


export async function get(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new PrismaUserRepository();
    const getService = new GetService(usersRepository);
    const users = await getService.get();
    return reply.status(200).send({ users })
}