import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
	get: protectedProcedure.query(async ({ ctx }) => {
		return ctx.db.user.findUnique({
			where: { id: ctx.session.user.id },
		});
	}),

	update: protectedProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.user.update({
				where: { id: ctx.session.user.id },
				data: { name: input.name },
			});
		}),

	getScores: publicProcedure.query(async ({ ctx }) => {
		return ctx.db.score.findMany({
			include: { user: { include: { bet: true } } },
			orderBy: { score: "asc" },
		});
	}),
});
