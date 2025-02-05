import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../checkIns-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements 

CheckInsRepository {

    public items: CheckIn[] = []

    async create (data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn =  {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validate_at: data.validate_at ? new Date(data.validate_at) : null,
            created_at: new Date(),
        }
            
        this.items.push(checkIn)
    
        return checkIn
    }
    async findAll(){

        return this.items
    }
    
}