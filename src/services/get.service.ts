import { UsersRepository } from "@/repositories/users-repository";


export class GetService {
    constructor(private usersRepository: UsersRepository) {} 

    async get() {
        const users = await this.usersRepository.findAll();
        return users
    }
}