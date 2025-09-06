// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, sendError, createError } from "h3";
import bcrypt from "bcryptjs";

// # Données
const prisma = new PrismaClient();

// # Handler principal
export default defineEventHandler(async (event) => {
	if (event.node.req.method === "GET") {
		return await prisma.user.findMany({
			orderBy: [{ admin: "desc" }, { name: "asc" }],
		});
	}

	if (event.node.req.method === "POST") {
		const data = await readBody(event);
		try {
			const hashedPassword = await bcrypt.hash(data.password, 10);
			return await prisma.user.create({
				data: {
					email: data.email,
					name: data.name,
					password: hashedPassword,
				},
			});
		} catch (err: any) {
			if (err.code === "P2002") {
				return sendError(event, createError({ statusCode: 400, statusMessage: "Cet email existe déjà." }));
			}
			return sendError(event, createError({ statusCode: 500, statusMessage: "Erreur création utilisateur." }));
		}
	}
});
