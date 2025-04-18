import { BetForm } from "~/components/bet/bet-form";
import { Countdown } from "~/components/countdown";
import { Card } from "~/components/ui/card";
import { api } from "~/trpc/server";

export async function BetCard() {
	const lockDate = await api.bet.getLockDate();
	void api.bet.getForUser.prefetch();
	void api.user.get.prefetch();

	return (
		<div className="flex w-full flex-col items-center justify-center gap-10 p-2">
			{lockDate && (
				<Countdown
					targetDate={lockDate}
					size="sm"
					title="Betting window closes in:"
				/>
			)}
			<Card className="w-full md:w-md">
				<BetForm />
			</Card>
		</div>
	);
}
