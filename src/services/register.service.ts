import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterServiceProps {
    name: string;
    email: string;
    password: string;
}

export class RegisterService {

    constructor(private usersRepositoty:UsersRepository) {}

    async registerService({ name, email, password }: RegisterServiceProps) {
        const password_hash = await hash(password, 6);
    
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });
    
        if (userAlreadyExists) {
            throw new Error("Email already exists")
        }
    
        await this.usersRepositoty.create({
            name,
            email,
            password_hash
        })
        
    }

}



