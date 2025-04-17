import {isAfter} from "date-fns";
import {BetSchema} from "~/lib/schemas";
import {createTRPCRouter, protectedProcedure, publicProcedure,} from "~/server/api/trpc";

export const betRouter = createTRPCRouter({
	submit: protectedProcedure
		.input(BetSchema)
		.mutation(async ({ ctx, input }) => {
			const { name, ...bet } = input;

			const [_, newBet] = await Promise.all([
				ctx.db.user.update({
					where: { id: ctx.session.user.id },
					data: { name },
				}),
				ctx.db.bet.upsert({
					where: { createdById: ctx.session.user.id },
					update: bet,
					create: {
						...bet,
						createdBy: { connect: { id: ctx.session.user.id } },
					},
				}),
			]);

			return newBet;
		}),

	delete: protectedProcedure.mutation(async ({ ctx }) => {
		return ctx.db.bet.delete({
			where: { createdById: ctx.session.user.id },
		});
	}),

	getForUser: protectedProcedure.query(async ({ ctx }) => {
		return ctx.db.bet.findFirst({
			where: { createdBy: { id: ctx.session.user.id } },
		});
	}),

	getLockDate: publicProcedure.query(async ({ ctx }) => {
		const event = await ctx.db.event.findFirst({
			where: { name: "esc" },
		});

		if (!event) {
			throw new Error("Event not found");
		}

		if (event.isLocked || !event.lockAt) {
			return null;
		}

		if (!event.isLocked && isAfter(new Date(), event.lockAt)) {
			await ctx.db.event.update({
				where: { name: "esc" },
				data: { isLocked: true },
			});
			return null;
		}

		return event.lockAt;
	}),
});
