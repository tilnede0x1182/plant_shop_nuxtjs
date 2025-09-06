import { defineEventHandler } from "h3";
// import { getUserSession } from "nuxt-auth-utils";

export default defineEventHandler(async (event) => {
	return await getUserSession(event); // { user, loggedInAt, ... } ou null
});
