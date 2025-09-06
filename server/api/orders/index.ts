// # Importations
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, sendError, createError } from "h3";
import { getServerSession } from "#auth";

// # Données
const prisma = new PrismaClient();

// # Handler principal
export default defineEventHandler(async (event) => {
	if (event.node.req.method === "GET") {
		const session = await getServerSession(event);
		if (!session?.user?.id) {
			return sendError(event, createError({ statusCode: 401, statusMessage: "Unauthorized" }));
		}
		const userId = Number(session.user.id);
		return await prisma.order.findMany({
			where: { userId },
			include: { orderItems: { include: { plant: true } } },
		});
	}

	if (event.node.req.method === "POST") {
		const { items, userId } = await readBody(event);
		if (!Array.isArray(items) || typeof userId !== "number") {
			return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid payload" }));
		}
		let total = 0;
		const order = await prisma.order.create({ data: { userId, status: "confirmed", totalPrice: 0 } });
		for (const item of items) {
			const plant = await prisma.plant.findUnique({ where: { id: item.plant_id } });
			if (!plant || plant.stock < item.quantity) {
				return sendError(event, createError({ statusCode: 400, statusMessage: `Stock insuffisant pour ${item.plant_id}` }));
			}
			total += plant.price * item.quantity;
			await prisma.plant.update({ where: { id: plant.id }, data: { stock: plant.stock - item.quantity } });
			await prisma.orderItem.create({
				data: { orderId: order.id, plantId: plant.id, quantity: item.quantity },
			});
		}
		return await prisma.order.update({ where: { id: order.id }, data: { totalPrice: total } });
	}
});
