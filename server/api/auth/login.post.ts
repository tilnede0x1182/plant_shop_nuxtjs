import { defineEventHandler, readBody, createError } from "h3";
// import { setUserSession } from "nuxt-auth-utils";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody<{ email: string; password: string }>(event);
	if (!email || !password) throw createError({ statusCode: 400, statusMessage: "Données invalides" });

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw createError({ statusCode: 401, statusMessage: "Identifiants invalides" });
	}

	await setUserSession(event, {
		user: { id: String(user.id), email: user.email, name: user.name ?? null, admin: user.admin },
		loggedInAt: new Date(),
	});
	return { ok: true };
});
