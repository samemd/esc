import { Results } from "~/components/admin/results";
import { Card } from "~/components/ui/card";
import { api } from "~/trpc/server";

export async function ResultsCard() {
	const rankings = await api.event.getRankings();

	return (
		<div className="flex w-full justify-center pb-10">
			<Card>
				<Results rankings={rankings} />
			</Card>
		</div>
	);
}
