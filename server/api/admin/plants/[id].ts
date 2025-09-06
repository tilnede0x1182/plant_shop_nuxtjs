// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, sendError, createError } from "h3";

// # Données
const prisma = new PrismaClient();

// # Handler principal
export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	if (isNaN(id)) return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid ID" }));

	if (event.node.req.method === "DELETE") {
		await prisma.plant.delete({ where: { id } });
		return { message: "Plant deleted" };
	}
});
