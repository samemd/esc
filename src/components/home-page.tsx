import Link from "next/link";
import { Countdown } from "~/components/countdown";
import { LeaderBoard } from "~/components/leader-board";
import { buttonVariants } from "~/components/ui/button";
import { EVENT_DATE } from "~/lib/constants";
import { api } from "~/trpc/server";

export async function HomePage() {
	const [lockDate, event] = await Promise.all([
		api.bet.getLockDate(),
		api.event.get(),
	]);

	return (
		<div className="inset-shadow-top flex min-h-[50.8vh] flex-col items-center justify-start gap-y-8 bg-gradient-to-b from-black to-background-blue py-4 text-white md:min-h-[55.8vh] md:gap-y-14 md:py-20">
			{event?.showCountdown && (
				<Countdown
					targetDate={EVENT_DATE}
					title="Final starts in:"
					className="z-10 bg-black/20 backdrop-blur-sm"
				/>
			)}
			<Countdown
				targetDate={lockDate}
				title="Betting window closes in:"
				className="z-10 bg-black/20 backdrop-blur-sm"
			/>
			{!event?.isLocked && (
				<Link
					className={buttonVariants({
						variant: "outline",
						size: "xl",
					})}
					href="/bets"
				>
					Place your Bets!
				</Link>
			)}

			<LeaderBoard />
		</div>
	);
}
