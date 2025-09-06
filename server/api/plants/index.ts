// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

// # Données
const prisma = new PrismaClient();

// # Handler principal
export default defineEventHandler(async (event) => {
	if (event.node.req.method === "GET") {
		// Liste des plantes en stock
		return await prisma.plant.findMany({
			where: { stock: { gte: 1 } },
			orderBy: { name: "asc" },
		});
	}

	if (event.node.req.method === "POST") {
		// Création d’une plante
		const data = await readBody(event);
		return await prisma.plant.create({ data });
	}
});
