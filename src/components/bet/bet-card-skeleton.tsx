import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Skeleton } from "../ui/skeleton";

export function BetCardSkeleton() {
	return (
		<Card className="w-full md:w-md">
			<div>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<div>Place your Bet</div>
						<Button size="icon" variant="ghost" type="button" disabled={true}>
							<Trash2 className="size-6 w-full text-muted-foreground" />
						</Button>
					</CardTitle>
					<CardDescription>Who is gonna win the ESC 2025?</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-8 pt-8">
					<div className="flex flex-col gap-2">
						<Label>Name</Label>
						<Skeleton className="h-10 border border-ring" />
					</div>
					<div className="flex flex-col gap-2">
						<Label>Winner 🏆</Label>
						<Skeleton className="h-10 border border-ring" />
					</div>
					<div className="flex flex-col gap-2">
						<Label>Second {"\u{1F948}"}</Label>
						<Skeleton className="h-10 border border-ring" />
					</div>
					<div className="flex flex-col gap-2">
						<Label>Third {"\u{1F949}"}</Label>
						<Skeleton className="h-10 border border-ring" />
					</div>

					<div className="flex flex-col gap-2">
						<Label>Last {"\u{1F4A9}"}</Label>
						<Skeleton className="h-10 border border-ring" />
					</div>
					<Button type="submit" className="relative mt-6">
						<div className="absolute inset-0 flex items-center justify-center">
							Submit
						</div>
					</Button>
				</CardContent>
			</div>
		</Card>
	);
}
