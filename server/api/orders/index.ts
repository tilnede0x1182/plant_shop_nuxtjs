import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, sendError, createError } from "h3";
// import { requireUserSession } from "nuxt-auth-utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	if (event.node.req.method === "GET") {
		const { user } = await requireUserSession(event);
		const userId = Number(user.id);

		return prisma.order.findMany({
			where: { userId },
			include: { orderItems: { include: { plant: true } } },
		});
	}

	if (event.node.req.method === "POST") {
		const { user } = await requireUserSession(event);
		const userId = Number(user.id);

		const { items } = await readBody<{ items: { plant_id: number; quantity: number }[] }>(event);
		if (!Array.isArray(items) || !items.length) {
			return sendError(event, createError({ statusCode: 400, statusMessage: "Données invalides" }));
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
			await prisma.orderItem.create({ data: { orderId: order.id, plantId: plant.id, quantity: item.quantity } });
		}
		return prisma.order.update({ where: { id: order.id }, data: { totalPrice: total } });
	}
});
