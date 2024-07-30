import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterServiceProps {
    name: string;
    email: string;
    password: string;
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {

    constructor(private usersRepositoty:UsersRepository) {}

    async registerService({ name, email, password }: RegisterServiceProps) : Promise<RegisterServiceResponse> {
        const password_hash = await hash(password, 6);
    
        const userAlreadyExists = await this.usersRepositoty.findByEmail(email)
    
        if (userAlreadyExists) {
            throw new Error("Email already exists")
        }
    
        const user = await this.usersRepositoty.create({
            name,
            email,
            password_hash
        })

        return { user } 
        
    }

}



