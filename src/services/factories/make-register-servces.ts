import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "@/services/register.service";

export function makeRegisterService() {
    const usersRepository = new PrismaUserRepository();
    const registerService = new RegisterService(usersRepository);

    return registerService;

}