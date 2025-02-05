import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-services";

export async function authenticate(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body);

    try { 
        const authenticateService = makeAuthenticateService();
        
        await authenticateService.execute({ 
            email, 
            password 
        }) 
    } catch (error) {
        return reply.status(400).send({ 
            message: "Email or password incorrect"})
    }
 
    return reply.status(200).send()
}