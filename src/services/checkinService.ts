import { CheckInsRepository } from "@/repositories/checkIns-repository"
import { CheckIn } from "@prisma/client"

interface CheckinServiceRequest {
    userId: string
    gymId: string
}

interface CheckinServiceResponse {
    checkIn: CheckIn
}

export class CheckinService {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({ userId, gymId }: CheckinServiceRequest): 
    Promise<CheckinServiceResponse> {
        const checkIn = await this.checkInsRepository.create({
            user_id:userId,
            gym_id:gymId
        })

        return {
            checkIn,
        }
    }

    async listCheckins(): Promise<CheckIn[]> {
        const checkIns = await this.checkInsRepository.findAll()

        return checkIns
    }

}