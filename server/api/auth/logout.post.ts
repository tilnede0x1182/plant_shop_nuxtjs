import { defineEventHandler } from "h3";
// import { clearUserSession } from "nuxt-auth-utils";

export default defineEventHandler(async (event) => {
	await clearUserSession(event);
	return { ok: true };
});
