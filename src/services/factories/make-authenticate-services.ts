import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserService } from "@/services/authenticate";

export function makeAuthenticateService() {
    const usersRepository = new PrismaUserRepository();
    const authenticateService = new AuthenticateUserService(usersRepository);

    return authenticateService;

}