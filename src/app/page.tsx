import Link from "next/link";
import { BannerVideo } from "~/components/banner-video";
import { Countdown } from "~/components/countdown";
import { LeaderBoard } from "~/components/leader-board";
import { buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function Home() {
	const targetDate = new Date("2025-05-17T21:00:00Z");
	const lockDate = await api.bet.getLockDate();
	const event = await api.event.get();

	return (
		<main className="flex flex-col">
			<BannerVideo className=" w-full" />
			{/*<div className="inset-shadow-top flex min-h-[55.8vh] flex-col items-center justify-start gap-y-8 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5)),url(/basel.jpg)] bg-center bg-cover py-20 text-white md:gap-y-14">*/}
			<div className="inset-shadow-top flex min-h-[50.8vh] flex-col items-center justify-start gap-y-8 bg-gradient-to-b from-black to-background-blue py-4 text-white md:min-h-[55.8vh] md:gap-y-14 md:py-20">
				{event?.showCountdown && (
					<Countdown
						targetDate={targetDate}
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
		</main>
	);
}
