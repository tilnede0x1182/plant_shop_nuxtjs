// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

// # Données
const prisma = new PrismaClient();

// # Handler principal
export default defineEventHandler(async () => {
	// Liste complète des plantes (admin)
	return await prisma.plant.findMany({
		orderBy: { name: "asc" },
	});
});
