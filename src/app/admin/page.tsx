import { redirect } from "next/navigation";
import { AdminSettings } from "~/components/admin-settings";
import { Results } from "~/components/results";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
	const session = await auth();

	if (!session?.user?.isAdmin) {
		redirect("/");
	}

	const rankings = await api.admin.getRankings();
	void api.event.get.prefetch();

	return (
		<HydrateClient>
			<main className="flex min-h-screen w-full items-start justify-center gap-y-14 bg-gradient-to-b from-black to-[#15162c] px-2">
				<Tabs defaultValue="settings" className="mt-6 w-full md:w-2xl">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="settings">Settings</TabsTrigger>
						<TabsTrigger value="results">Results</TabsTrigger>
					</TabsList>
					<TabsContent value="settings">
						<AdminSettings />
					</TabsContent>
					<TabsContent value="results">
						<Results rankings={rankings} />
					</TabsContent>
				</Tabs>
			</main>
		</HydrateClient>
	);
}
