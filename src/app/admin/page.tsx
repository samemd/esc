import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminSettingsCard } from "~/components/admin/admin-settings-card";
import { ResultsCard } from "~/components/admin/results-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { auth } from "~/server/auth";

export default async function Admin() {
	const session = await auth();

	if (!session?.user?.isAdmin) {
		redirect("/");
	}

	return (
		<main className="flex min-h-screen w-full items-start justify-center gap-y-14 bg-gradient-to-b from-black to-[#15162c] px-2">
			<Tabs defaultValue="settings" className="mt-6 w-full md:w-2xl">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="settings">Settings</TabsTrigger>
					<TabsTrigger value="results">Results</TabsTrigger>
				</TabsList>
				<TabsContent value="settings">
					<Suspense>
						<AdminSettingsCard />
					</Suspense>
				</TabsContent>
				<TabsContent value="results">
					<Suspense>
						<ResultsCard />
					</Suspense>
				</TabsContent>
			</Tabs>
		</main>
	);
}
