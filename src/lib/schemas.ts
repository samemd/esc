import { z } from "zod";

export const BetSchema = z
	.object({
		name: z.string(),
		winner: z.string(),
		second: z.string(),
		third: z.string(),
		last: z.string(),
		winningScore: z.string(),
	})
	.superRefine((data, ctx) => {
		const countries = [data.winner, data.second, data.third, data.last];
		const seen = new Set();

		countries.forEach((country, index) => {
			if (seen.has(country)) {
				const fieldNames = ["winner", "second", "third", "last"];
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `${country} is used more than once`,
					path: [fieldNames[index] as string],
				});
			}
			seen.add(country);
		});
	});

export const RankingSchema = z.object({
	position: z.number().int().min(1).max(26),
	country: z.string().min(1, "Country is required"),
	score: z.string().optional(),
});
export type Ranking = z.infer<typeof RankingSchema>;

export const RankingsSchema = z.array(RankingSchema);
export type Rankings = z.infer<typeof RankingsSchema>;

export const RankingsFormSchema = z
	.object({
		rankings: z.array(
			z.object({
				position: z.number().int().optional(),
				country: z.string().optional(),
				score: z.string().optional(),
			}),
		),
	})
	.superRefine((data, ctx) => {
		// Skip validation if there are no rankings or if countries are not set
		if (!data.rankings?.length) return;

		// Track countries that have been seen
		const seenCountries = new Map();

		data.rankings.forEach((ranking, index) => {
			// Skip empty country fields
			if (!ranking.country) return;

			if (seenCountries.has(ranking.country)) {
				// Get the previous index where this country was used
				const previousIndex = seenCountries.get(ranking.country);

				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `${ranking.country} is used more than once (also at position ${data.rankings[previousIndex]?.position || previousIndex + 1})`,
					path: [`rankings.${index}.country`],
				});
			} else {
				// Record this country and its index
				seenCountries.set(ranking.country, index);
			}
		});
	});
