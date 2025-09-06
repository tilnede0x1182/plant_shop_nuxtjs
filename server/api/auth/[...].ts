// # Importations
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// # Données
const prisma = new PrismaClient();

// # Handler Auth
export default NuxtAuthHandler({
	providers: [
		CredentialsProvider.default({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any) {
				if (!credentials?.email || !credentials?.password) return null;
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!user) return null;
				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) return null;
				return {
					id: String(user.id),
					email: user.email,
					name: user.name ?? undefined,
					admin: user.admin,
				};
			},
		}),
	],
	session: { strategy: "jwt" },
	pages: {
		signIn: "/auth/signin",
	},
});
