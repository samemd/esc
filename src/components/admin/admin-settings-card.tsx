import { LogOut } from "lucide-react";
import { AdminSettings } from "~/components/admin/admin-settings";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import logout from "~/server/actions/logout";
import { api } from "~/trpc/server";

export async function AdminSettingsCard() {
	const event = await api.event.get();

	return (
		<div className="flex w-full justify-center pb-10">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						Settings
						<form action={logout}>
							<Button id="logout" type="submit">
								<LogOut />
							</Button>
						</form>
					</CardTitle>
					{event?.lockAt && !event?.isLocked && (
						<CardDescription>{`Locking Date set to: ${event.lockAt.toISOString()}`}</CardDescription>
					)}
				</CardHeader>
				<CardContent className="pt-8">
					<AdminSettings event={event} />
				</CardContent>
			</Card>
		</div>
	);
}
