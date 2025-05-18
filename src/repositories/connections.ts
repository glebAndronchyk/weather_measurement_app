import {PrismaClient} from "../generated/prisma/client.ts";

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
