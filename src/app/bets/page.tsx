import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BetCard } from "~/components/bet/bet-card";
import { BetCardSkeleton } from "~/components/bet/bet-card-skeleton";
import { auth } from "~/server/auth";

export default async function Home() {
	const session = await auth();

	if (!session?.user) {
		redirect("/login?redirectTo=/bets");
	}

	return (
		<main className="flex min-h-(--min-height) w-full items-center justify-center">
			<Suspense fallback={<BetCardSkeleton />}>
				<BetCard />
			</Suspense>
		</main>
	);
}
