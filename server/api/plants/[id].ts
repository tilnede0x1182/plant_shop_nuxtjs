// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, sendError, createError } from "h3";

// # Données
const prisma = new PrismaClient();

// # Handler principal
export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	if (isNaN(id)) return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid ID" }));

	if (event.node.req.method === "GET") {
		const plant = await prisma.plant.findUnique({ where: { id } });
		if (!plant) return sendError(event, createError({ statusCode: 404, statusMessage: "Plant not found" }));
		return plant;
	}

	if (event.node.req.method === "PUT") {
		const data = await readBody(event);
		return await prisma.plant.update({ where: { id }, data });
	}

	if (event.node.req.method === "DELETE") {
		await prisma.plant.delete({ where: { id } });
		return { message: "Plant deleted" };
	}
});
