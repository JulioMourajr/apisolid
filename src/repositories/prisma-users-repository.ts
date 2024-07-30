import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUserRepository{
    async create(data: Prisma.UserCreateInput) {
        prisma.user.create({
            data,
        })

    }
} 

