import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "./register.service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut : RegisterService;

describe("Register Service", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterService(usersRepository);
    })

    it('should to register', async () => {
        
    
        const { user } = await sut.registerService({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        })
    
        expect(user.id).toEqual(expect.any(String))
      })


    it("should hash user password to register", async () => {


        const { user } = await sut.registerService({
            name: "John Doe",
            email: "7bS7U@example.com",
            password: "123456"
        })

        const isPasswordCorrectlyHashed = await compare("123456", user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)       
    });

    it("should not be able to register with same email twice", async () => {

        const email = "email@example.com";
        const password = "123456";
        const name = "John Doe";

        await sut.registerService({
            name,
            email,
            password
        })

        expect(async () => {
            await sut.registerService({
                name,
                email,
                password
            })
        }).rejects.toBeInstanceOf(Error)
    })                  
})  