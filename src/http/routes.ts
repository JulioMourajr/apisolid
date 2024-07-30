import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { get } from "./controllers/get";


export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register)
    app.get("/users", get)
}


