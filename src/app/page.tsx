import Link from "next/link";
import { BannerVideo } from "~/components/banner-video";
import { Countdown } from "~/components/countdown";
import { LeaderBoard } from "~/components/leader-board";
import { buttonVariants } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
	const session = await auth();
	const targetDate = new Date("2025-05-17T21:00:00Z");
	const lockDate = await api.bet.getLockDate();

	return (
		<main className="flex flex-col items-center justify-start gap-y-8 pb-14 text-white md:justify-center md:gap-y-14">
			<BannerVideo className="w-full" />
			<Countdown targetDate={targetDate} title="Final starts in:" />
			<Countdown targetDate={lockDate} title="Betting window closes in:" />
			{!!lockDate && (
				<Link
					className={buttonVariants({ variant: "outline", size: "xl" })}
					href="/bets"
				>
					Place your Bets!
				</Link>
			)}

			<LeaderBoard />

			{session?.user?.isAdmin && (
				<Link className={buttonVariants({ size: "xl" })} href="/admin">
					Admin
				</Link>
			)}
		</main>
	);
}
