"use client";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function LeaderBoard() {
	const { data: scores } = api.user.getScores.useQuery();
	const { data: event } = api.event.get.useQuery();
	const { data: rankings } = api.event.getRankings.useQuery();

	if (!event?.showResults) {
		return null;
	}

	const winner = rankings?.find((r) => r.position === 1)?.country;
	const second = rankings?.find((r) => r.position === 2)?.country;
	const third = rankings?.find((r) => r.position === 3)?.country;
	const last = rankings?.find((r) => r.position === 26)?.country;

	return (
		<div className="flex w-full flex-col gap-4 p-2 md:w-xl">
			{scores?.map((score, index) => (
				<div
					key={score.id}
					className="relative flex flex-col items-center justify-between gap-4 rounded-md border bg-black/60 p-4 shadow-md backdrop-blur-md"
				>
					{index === 0 && (
						<div className="md:-top-10 md:-left-6 -left-2 -top-5 -rotate-25 absolute animate-bounce text-4xl md:text-6xl">
							{"\u{1F451}"}
						</div>
					)}
					<div className="flex w-full justify-between">
						<div className="flex gap-4 text-2xl">
							<p className="font-extrabold text-emerald-400">{index + 1}</p>
							<h3 className="truncate font-bold">{score.user.name}</h3>
						</div>
						<div className="flex gap-4 text-2xl">
							<span className="text-muted-foreground">Score</span>
							<span className="font-extrabold text-emerald-400">
								{score.score}
							</span>
						</div>
					</div>
					<div className="flex w-full items-center justify-between rounded-sm bg-card px-4 py-2 text-muted-foreground">
						<p
							className={cn({
								"text-emerald-300": winner === score.user.bet?.winner,
							})}
						>
							🏆 {score.user.bet?.winner}
						</p>
						<p
							className={cn({
								"text-emerald-300": second === score.user.bet?.second,
							})}
						>
							{"\u{1F948}"} {score.user.bet?.second}
						</p>
						<p
							className={cn({
								"text-emerald-300": third === score.user.bet?.third,
							})}
						>
							{"\u{1F949}"} {score.user.bet?.third}
						</p>
						<p
							className={cn({
								"text-emerald-300": last === score.user.bet?.last,
							})}
						>
							{"\u{1F4A9}"} {score.user.bet?.last}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
