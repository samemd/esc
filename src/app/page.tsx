import Image from "next/image";
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
		<main className="flex flex-col">
			<BannerVideo className=" w-full" />
			<div className="inset-shadow-top flex min-h-[55.8vh] flex-col items-center justify-start gap-y-8 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5)),url(/basel.jpg)] bg-center bg-cover py-20 text-white md:gap-y-14">
				<Countdown
					targetDate={targetDate}
					title="Final starts in:"
					className="z-10 bg-black/25 backdrop-blur-sm"
				/>
				<Countdown targetDate={lockDate} title="Betting window closes in:" />
				{!lockDate && (
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

				{session?.user?.isAdmin && (
					<Link className={buttonVariants({ size: "xl" })} href="/admin">
						Admin
					</Link>
				)}
			</div>
		</main>
	);
}
