// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, sendError, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	if (isNaN(id)) {
		console.log("API: ID utilisateur invalide");
		return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid ID" }));
	}

	if (event.node.req.method === "GET") {
		console.log(`API: Recherche utilisateur ID=${id}`);
		const user = await prisma.user.findUnique({ where: { id } });

		if (!user) {
			console.log(`API: Utilisateur ID=${id} non trouvé en base`);
			return sendError(event, createError({ statusCode: 404, statusMessage: "User not found" }));
		}

		console.log(`API: Utilisateur ID=${id} trouvé`);
		return user;
	}

	if (event.node.req.method === "PUT") {
		const data = await readBody(event);
		const updated = await prisma.user.update({ where: { id }, data });

		// Mise à jour de la session si c'est l'utilisateur connecté
		const session = await getUserSession(event); // auto-import
		if (session?.user?.id && Number(session.user.id) === id) {
			await setUserSession(event, {
				// auto-import
				...session,
				user: {
					id: String(updated.id),
					email: updated.email,
					name: updated.name ?? null,
					admin: updated.admin,
				},
			});
		}
		return updated;
	}

	if (event.node.req.method === "DELETE") {
		await prisma.user.delete({ where: { id } });
		return { message: "User deleted" };
	}
});
