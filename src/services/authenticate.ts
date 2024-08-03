import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { sign } from "crypto"

interface AuthenticateUserRequest {
    email: string
    password: string
}

interface AuthenticateUserResponse {
    user: User
}


export class AuthenticateUserService {

    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error("User not found")
        }

        const passwordMatch = await compare(password, user.password_hash)

        if (!passwordMatch) {
            throw new Error("Incorrect password")
        }

        return {
            user,
        }
}
}

