// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, sendError, createError } from "h3";

// # Données
const prisma = new PrismaClient();

// # Handler principal
export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	if (isNaN(id)) return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid ID" }));

	if (event.node.req.method === "GET") {
		const order = await prisma.order.findUnique({
			where: { id },
			include: { orderItems: true },
		});
		if (!order) return sendError(event, createError({ statusCode: 404, statusMessage: "Order not found" }));
		return order;
	}

	if (event.node.req.method === "PUT") {
		const data = await readBody(event);
		return await prisma.order.update({ where: { id }, data });
	}

	if (event.node.req.method === "DELETE") {
		await prisma.order.delete({ where: { id } });
		return { message: "Order deleted" };
	}
});
