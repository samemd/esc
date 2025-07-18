"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { ActionBar } from "~/components/action-bar";
import { NationsAutoComplete } from "~/components/primitives/nations";
import { Button } from "~/components/ui/button";
import {
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
import { Input } from "~/components/ui/input";
import { type Ranking, RankingSchema, RankingsFormSchema } from "~/lib/schemas";
import { api } from "~/trpc/react";

export function Results({ rankings }: { rankings: Ranking[] }) {
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

	const defaultValues = useMemo(
		() =>
			Array.from({ length: 26 }, (_, i) => ({
				position: i + 1,
				country: rankings?.find((r) => r.position === i + 1)?.country ?? "",
				score: "",
			})),
		[rankings],
	);

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

	function onSubmit(data: z.infer<typeof RankingsFormSchema>) {
		const rankings = data.rankings.filter(
			(r): r is Ranking => RankingSchema.safeParse(r).success,
		);
		submitRankings(rankings);
	}

	return (
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
						<FormField
							control={form.control}
							name={"rankings.0.score"}
							render={({ field }) => (
								<FormItem className="col-span-2 flex flex-col">
									<FormLabel>Winning Score</FormLabel>
									<Input
										className="rounded-full border-ring bg-background [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
										type="number"
										placeholder="0"
										{...field}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						{fields.map((field, index) => {
							return (
								<FormField
									key={field.id}
									control={form.control}
									name={`rankings.${index}.country`}
									render={({ field: countryField }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Position {index + 1}</FormLabel>
											<NationsAutoComplete {...countryField} />
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
	);
}
