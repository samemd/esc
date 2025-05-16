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
			// 1) The four positional predictions
			const predictions = [
				{ position: 1, country: bet.winner, weight: 1.5 },
				{ position: 2, country: bet.second, weight: 1.25 },
				{ position: 3, country: bet.third, weight: 1.0 },
				{ position: 26, country: bet.last, weight: 1.0 },
			];

			const baseScore = 100; // Starting score
			const exactGuessBonus = 50; // Bonus points for exact guesses

			// 2) Compute the "position‐based" points
			let score = predictions.reduce((acc, { position, country, weight }) => {
				const actual = rankings.find((r) => r.country === country);
				if (!actual) {
					return acc - 50;
				}
				const diff = Math.abs(actual.position - position);
				if (diff === 0) {
					return acc + exactGuessBonus * weight;
				}
				return acc + (25 - diff) * weight;
			}, baseScore);

			// 3) Parse the user’s predicted winningScore and the real one
			const predictedWS = Number.parseInt(bet.winningScore || "", 10);
			const winnerScore = rankings.find((r) => r.position === 1)?.score;
			const actualWS = winnerScore
				? Number.parseInt(winnerScore, 10)
				: undefined;

			// 4) Award based on how close they got the winning score
			const d = Math.abs(actualWS ?? 0 - predictedWS);
			if (d === 0) {
				// exact score
				score += 30;
			} else {
				// sliding‐scale: max 20 pts for very close guesses
				score += Math.max(0, 20 - d);
			}

			return {
				userId: bet.createdById,
				score: Math.max(0, Math.round(score)), // Ensure score is never negative and round to integer
			};
		});

		// delete all existing scores
		await ctx.db.score.deleteMany({});
		await ctx.db.score.createMany({ data: scores });

		return scores;
	}),
});
