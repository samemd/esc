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
				{ position: 1, country: bet.winner, weight: 1.5 },
				{ position: 2, country: bet.second, weight: 1.25 },
				{ position: 3, country: bet.third, weight: 1.0 },
				{ position: 26, country: bet.last, weight: 1.0 },
			];

			const baseScore = 100; // Starting score
			const exactGuessBonus = 50; // Bonus points for exact guesses

			const score = predictions.reduce((acc, prediction) => {
				const actual = rankings.find((r) => r.country === prediction.country);

				if (!actual) {
					return acc - 50;
				}

				const positionDifference = Math.abs(
					actual.position - prediction.position,
				);

				if (positionDifference === 0) {
					// Exact guess: add bonus points (weighted for winner)
					return acc + exactGuessBonus * prediction.weight;
				}
				// Points based on how close the guess was (weighted for winner)
				// The closer the guess, the more points (max points minus the difference)
				return acc + (25 - positionDifference);
			}, baseScore);

			return {
				userId: bet.createdById,
				score: Math.max(0, Math.round(score)), // Ensure score is never negative and round to integer
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
