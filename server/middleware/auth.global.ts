import { defineEventHandler, sendRedirect } from "h3";
// import { requireUserSession } from "nuxt-auth-utils";

export default defineEventHandler(async (event) => {
	const url = new URL(event.node.req.url || "/", `http://${event.node.req.headers.host || "localhost"}`);
	const { pathname } = url;

	// Protéger toute la zone admin (pages + API)
	if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
		const { user } = await requireUserSession(event); // 401 si non connecté
		if (!user?.admin) return sendRedirect(event, "/auth/unauthorized", 302);
	}
});
