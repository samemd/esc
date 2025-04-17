"use client";

import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";

export function AdminSettings() {
	const utils = api.useUtils();
	const [event] = api.event.get.useSuspenseQuery();
	const { mutate: startCountdown } = api.event.setLockDate.useMutation({
		onSuccess: (data) => {
			void utils.event.get.invalidate();
			void utils.bet.getLockDate.invalidate();
			toast.success(data.lockAt ? "Lock date set" : "Lock date removed", {
				description: data.lockAt?.toISOString(),
			});
		},
	});

	const { mutate: lockBets } = api.event.lockBets.useMutation({
		onSuccess: (data) => {
			void utils.event.get.invalidate();
			toast.success(data.isLocked ? "Bets locked" : "Bets unlocked");
		},
	});

	const { mutate: showResults } = api.event.showResults.useMutation({
		onSuccess: (data) => {
			void utils.event.get.invalidate();
			toast.success(
				data.showResults ? "Results published" : "Results unpublished",
			);
		},
	});

	return (
		<div className="flex w-full justify-center pb-10">
			<Card>
				<CardHeader>
					<CardTitle>Settings</CardTitle>
					{event?.lockAt && !event?.isLocked && (
						<CardDescription>{`Locking Date set to: ${event.lockAt.toISOString()}`}</CardDescription>
					)}
				</CardHeader>
				<CardContent className="pt-8">
					<div className="grid gap-6 px-6 pb-16 ">
						<div className="flex items-center justify-between rounded-md border border-ring p-6">
							<Label htmlFor="start-countdown">Start Countdown</Label>
							<Switch
								id="start-countdown"
								defaultChecked={!!event?.lockAt}
								onCheckedChange={(checked) => {
									startCountdown(checked);
								}}
							/>
						</div>
						<div className="flex items-center justify-between rounded-md border border-ring p-6">
							<Label htmlFor="lock-bets">Lock Bets</Label>
							<Switch
								id="lock-bets"
								defaultChecked={event?.isLocked}
								onCheckedChange={(checked) => {
									lockBets(checked);
								}}
							/>
						</div>

						<div className="flex items-center justify-between rounded-md border border-ring p-6">
							<Label htmlFor="show-results">Show Results</Label>
							<Switch
								id="show-results"
								defaultChecked={!!event?.showResults}
								onCheckedChange={(checked) => {
									showResults(checked);
								}}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
