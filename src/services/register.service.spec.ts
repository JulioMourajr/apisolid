import { describe, expect, it } from "vitest";
import { RegisterService } from "./register.service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("RegisterService", () => {

    it('should to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository);
    
        const { user } = await registerService.registerService({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        })
    
        expect(user.id).toEqual(expect.any(String))
      })


    it("should hash user password to register", async () => {

        const usersRepository = new InMemoryUsersRepository();

        const registerService = new RegisterService(usersRepository);

        const { user } = await registerService.registerService({
            name: "John Doe",
            email: "7bS7U@example.com",
            password: "123456"
        })

        const isPasswordCorrectlyHashed = await compare("123456", user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)       
    });

    it("should not be able to register with same email twice", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(usersRepository);

        const email = "email@example.com";
        const password = "123456";
        const name = "John Doe";

        await registerService.registerService({
            name,
            email,
            password
        })

        expect(async () => {
            await registerService.registerService({
                name,
                email,
                password
            })
        }).rejects.toBeInstanceOf(Error)
    })                  
})  