import { redirect } from "next/navigation";
import { Bet } from "~/components/bet";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
	const session = await auth();

	if (!session?.user) {
		redirect("/login?redirectTo=/bets");
	}

	await Promise.all([api.user.get.prefetch(), api.bet.getForUser.prefetch()]);

	return (
		<HydrateClient>
			<main className="flex min-h-(--min-height) w-full items-center justify-center">
				<Bet />
			</main>
		</HydrateClient>
	);
}
