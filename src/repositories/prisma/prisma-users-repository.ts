import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUserRepository implements UsersRepository {

    async findByEmail (email: string){
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user

    }

    async findAll() {
        const users = await prisma.user.findMany();
        return users
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user
    }
} 

