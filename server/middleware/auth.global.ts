// # Importations
import { defineEventHandler, sendRedirect } from "h3";

// # Middleware global d'authentification
export default defineEventHandler(async (event) => {
	const url = new URL(event.node.req.url || "/", `http://${event.node.req.headers.host || "localhost"}`);
	const { pathname } = url;

	// Routes publiques (pages + API associées)
	const publicRoutes = ["/", "/plants", "/api/plants", "/auth/signin", "/api/auth", "/auth/register", "/api/users", "/cart"];

	const isPublic = publicRoutes.some(
		(route) =>
			pathname === route ||
			(route === "/plants" && pathname.startsWith("/plants/")) ||
			(route === "/api/plants" && pathname.startsWith("/api/plants/")) ||
			(route === "/api/auth" && pathname.startsWith("/api/auth")) ||
			(route === "/api/users" && pathname.startsWith("/api/users"))
	);

	// Zone admin → login + admin requis
	if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
		const session = await requireUserSession(event).catch(() => null);
		if (!session?.user) return sendRedirect(event, "/auth/signin", 302);
		if (!session.user.admin) return sendRedirect(event, "/plants", 302);
		return;
	}

	// Tout ce qui n'est pas public → login requis + user toujours existant en BDD
	if (!isPublic) {
		const session = await requireUserSession(event).catch(() => null);
		if (!session?.user) return sendRedirect(event, "/auth/signin", 302);

		// Vérification existence utilisateur en BDD
		const { PrismaClient } = await import("@prisma/client");
		const prisma = new PrismaClient();
		const userDb = await prisma.user.findUnique({ where: { id: Number(session.user.id) } }).catch(() => null);
		await prisma.$disconnect();
		if (!userDb) return sendRedirect(event, "/auth/signin", 302);
	}
});
