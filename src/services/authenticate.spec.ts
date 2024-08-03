import { AuthenticateUserService } from "./authenticate";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut : AuthenticateUserService;

describe("Authenticate User Service", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUserService(usersRepository);
    })

    it('should authenticate', async () => {
       

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        });
    
        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });
        
        expect(user.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => {
        
    
        expect(() =>
          sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
          }),
        ).rejects.toBeInstanceOf(Error)
      })

      it('should not be able to authenticate with wrong password', async () => {
      

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        });
    
        expect(() =>
            sut.execute({
              email: 'johndoe@example.com',
              password: '123123',
            }),
          ).rejects.toBeInstanceOf(Error)
        })
});



