import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"

interface GetUserProfileRequest {
    userId: string
}

interface GetUserProfileResponse {
    user: User
}

export class GetUserProfileService {

    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new Error("User not found")
        }

        return {
            user,
        }
    }
}