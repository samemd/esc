import { RankingsSchema } from "~/lib/schemas";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
	submitRankings: adminProcedure
		.input(RankingsSchema)
		.mutation(async ({ ctx, input }) => {
			// delete all existing rankings
			await ctx.db.ranking.deleteMany({});

			return ctx.db.ranking.createMany({
				data: input,
			});
		}),

	calculateScores: adminProcedure.mutation(async ({ ctx }) => {
		const [bets, rankings] = await Promise.all([
			ctx.db.bet.findMany(),
			ctx.db.ranking.findMany(),
		]);

		const scores = bets.map((bet) => {
			const predictions = [
				{ position: 1, country: bet.winner },
				{ position: 2, country: bet.second },
				{ position: 3, country: bet.third },
				{ position: 26, country: bet.last },
			];

			const score = predictions.reduce((acc, prediction) => {
				const actual = rankings.find((r) => r.country === prediction.country);
				if (!actual) return acc + 100;
				return acc + Math.abs(actual.position - prediction.position);
			}, 0);
			return {
				userId: bet.createdById,
				score,
			};
		});

		// delete all existing scores
		await ctx.db.score.deleteMany({});

		await ctx.db.score.createMany({
			data: scores,
		});

		return scores;
	}),
});
