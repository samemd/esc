"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { ActionBar } from "~/components/action-bar";
import { NationsAutoComplete } from "~/components/primitives/nations";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { type Ranking, RankingSchema, RankingsFormSchema } from "~/lib/schemas";
import { api } from "~/trpc/react";

export function Results({
	rankings: initialRankings,
}: { rankings: Ranking[] }) {
	const utils = api.useUtils();

	const { mutate: submitRankings, isPending } =
		api.admin.submitRankings.useMutation({
			onSuccess: () => {
				void utils.event.getRankings.invalidate();
				toast.success("Rankings submitted successfully");
				calculateScores();
			},
			onError: (error) => {
				toast.error(`Error submitting rankings: ${error.message}`);
			},
		});

	const { mutate: calculateScores } = api.admin.calculateScores.useMutation({
		onSuccess: () => {
			void utils.user.getScores.invalidate();
			toast.success("Scores calculated successfully");
		},
		onError: (error) => {
			toast.error(`Error calculating scores: ${error.message}`);
		},
	});

	const { data: existingRankings } = api.event.getRankings.useQuery(undefined, {
		initialData: initialRankings,
	});

	const defaultValues = useMemo(
		() =>
			Array.from({ length: 26 }, (_, i) => ({
				position: i + 1,
				country:
					existingRankings?.find((r) => r.position === i + 1)?.country ?? "",
			})),
		[existingRankings],
	);

	// Initialize form with 37 positions
	const form = useForm<z.infer<typeof RankingsFormSchema>>({
		resolver: zodResolver(RankingsFormSchema),
		defaultValues: {
			rankings: defaultValues,
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "rankings",
	});

	const watchedRankings = useWatch({
		control: form.control,
		name: "rankings",
	});

	function onSubmit(data: z.infer<typeof RankingsFormSchema>) {
		const rankings = data.rankings.filter(
			(r): r is Ranking => RankingSchema.safeParse(r).success,
		);
		submitRankings(rankings);
	}

	return (
		<div className="flex w-full justify-center pb-10">
			<Card>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardHeader>
							<CardTitle>Enter Final Results</CardTitle>
							<CardDescription>
								Enter the final ranking positions for all 37 countries
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-8">
							<div className="grid gap-6 pb-16 md:grid-cols-2">
								{fields.map((field, index) => {
									const excludedCountries = watchedRankings
										.map((r) => r.country)
										.filter(
											(country, i) =>
												i !== index && country !== "" && country !== undefined,
										);
									return (
										<FormField
											key={field.id}
											control={form.control}
											name={`rankings.${index}.country`}
											render={({ field: countryField }) => (
												<FormItem className="flex flex-col">
													<FormLabel>Position {index + 1}</FormLabel>
													<NationsAutoComplete
														{...countryField}
														excludedCountries={excludedCountries}
													/>
													<FormMessage />
												</FormItem>
											)}
										/>
									);
								})}
							</div>
						</CardContent>
						<ActionBar className="px-6">
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? "Submitting..." : "Submit Rankings"}
							</Button>
						</ActionBar>
					</form>
				</Form>
			</Card>
		</div>
	);
}
