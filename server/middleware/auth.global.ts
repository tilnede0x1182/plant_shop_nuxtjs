// # Importations
import { getServerSession } from "#auth";
import { defineEventHandler, sendRedirect } from "h3";

// # Middleware global
export default defineEventHandler(async (event) => {
	const url = event.node.req.url || "";

	// Protéger uniquement /admin
	if (url.startsWith("/admin")) {
		const session = await getServerSession(event);
		const user = session?.user as { admin?: boolean } | undefined;

		if (!user) {
			return sendRedirect(event, "/auth/signin");
		}
		if (!user.admin) {
			return sendRedirect(event, "/unauthorized");
		}
	}
});
