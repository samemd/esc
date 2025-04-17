import { addMinutes } from "date-fns";
import { z } from "zod";
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return ctx.db.event.findFirst({
			where: { name: "esc" },
		});
	}),

	showCountdown: adminProcedure
		.input(z.boolean())
		.mutation(async ({ ctx, input }) => {
			return ctx.db.event.update({
				where: { name: "esc" },
				data: { showCountdown: input },
			});
		}),

	setLockDate: adminProcedure
		.input(z.boolean())
		.mutation(async ({ ctx, input }) => {
			return ctx.db.event.update({
				where: { name: "esc" },
				data: { lockAt: input ? addMinutes(new Date(), 10) : null },
			});
		}),

	lockBets: adminProcedure
		.input(z.boolean())
		.mutation(async ({ ctx, input }) => {
			return ctx.db.event.update({
				where: { name: "esc" },
				data: { isLocked: input },
			});
		}),

	showResults: adminProcedure
		.input(z.boolean())
		.mutation(async ({ ctx, input }) => {
			return ctx.db.event.update({
				where: { name: "esc" },
				data: { showResults: input },
			});
		}),

	getRankings: publicProcedure.query(async ({ ctx }) => {
		return ctx.db.ranking.findMany({
			orderBy: { position: "asc" },
		});
	}),
});
