"use client";

import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button, buttonVariants } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { type RouterOutputs, api } from "~/trpc/react";

export function AdminSettings({
	event,
}: { event: RouterOutputs["event"]["get"] }) {
	const utils = api.useUtils();

	const { mutate: showCountdown } = api.event.showCountdown.useMutation({
		onSuccess: (data) => {
			void utils.event.get.invalidate();
			toast.success(
				data.showCountdown ? "Countdown shown" : "Countdown hidden",
			);
		},
	});

	const { mutate: startBettingCountdown } = api.event.setLockDate.useMutation({
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

	const { mutate: calculateScores } = api.admin.calculateScores.useMutation({
		onSuccess: () => {
			void utils.user.getScores.invalidate();
			toast.success("Scores recalculated successfully");
		},
	});

	return (
		<div className="grid gap-6 px-6 pb-16 ">
			<div className="flex items-center justify-between rounded-md border border-ring p-6">
				<Label htmlFor="show-countdown">Show Countdown</Label>
				<Switch
					id="show-countdown"
					defaultChecked={!!event?.showCountdown}
					onCheckedChange={(checked) => {
						showCountdown(checked);
					}}
				/>
			</div>
			<div className="flex items-center justify-between rounded-md border border-ring p-6">
				<Label htmlFor="start-countdown">Start Betting Countdown</Label>
				<Switch
					id="start-countdown"
					defaultChecked={!!event?.lockAt}
					onCheckedChange={(checked) => {
						startBettingCountdown(checked);
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
			<div className="flex items-center justify-between rounded-md border border-ring px-6 py-4.5">
				<Label htmlFor="calculate-scores">Recalculate Scores</Label>
				<Button
					size="sm"
					id="calculate-scores"
					onClick={() => calculateScores()}
				>
					<RefreshCcw />
				</Button>
			</div>
			<div className="flex items-center justify-between rounded-md border border-ring p-6">
				<Label htmlFor="show-countdown">Database access</Label>
				<Link
					id="db-link"
					className={buttonVariants({})}
					href="https://console.neon.tech/app/projects/morning-bush-04673706/branches/br-dry-glade-a2usas51/tables"
					target="_blank"
				>
					Open Database Dashboard
				</Link>
			</div>
		</div>
	);
}
