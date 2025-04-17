"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Countdown } from "~/components/countdown";
import { NationsAutoComplete } from "~/components/primitives/nations";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useConfetti } from "~/hooks/confetti";
import { BetSchema } from "~/lib/schemas";
import { api } from "~/trpc/react";

export function Bet() {
	const utils = api.useUtils();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { trigger } = useConfetti(buttonRef);

	const { data: lockDate } = api.bet.getLockDate.useQuery();
	const { mutate: submitBet } = api.bet.submit.useMutation({
		onSuccess: () => {
			void utils.bet.getForUser.invalidate();
			toast.success("Vote submitted");
		},
	});
	const { mutate: deleteBet } = api.bet.delete.useMutation({
		onSuccess: async () => {
			await utils.bet.getForUser.invalidate();
			form.reset();
			toast.success("Bet deleted");
		},
	});
	const [bet] = api.bet.getForUser.useSuspenseQuery();
	const [user] = api.user.get.useSuspenseQuery();

	const form = useForm<z.infer<typeof BetSchema>>({
		resolver: zodResolver(BetSchema),
		defaultValues: {
			name: user?.name ?? "",
			winner: bet?.winner,
			second: bet?.second,
			third: bet?.third,
			last: bet?.last,
		},
	});
	const watchedValues = useWatch({
		control: form.control,
		name: ["winner", "second", "third", "last"],
	});

	function onSubmit(data: z.infer<typeof BetSchema>) {
		trigger();
		submitBet(data);
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-10 p-2">
			{lockDate && (
				<Countdown
					targetDate={lockDate}
					size="sm"
					title="Betting window closes in:"
				/>
			)}
			<Card className="w-full md:w-md">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<div>Place your Bet</div>
								<Button
									size="icon"
									variant="ghost"
									type="button"
									disabled={!bet}
									onClick={() => deleteBet()}
								>
									<Trash2 className="size-6 w-full text-muted-foreground" />
								</Button>
							</CardTitle>
							<CardDescription>Who is gonna win the ESC 2025?</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-8 pt-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Name</FormLabel>
										<Input
											className="rounded-full border-ring bg-background"
											type="text"
											placeholder="Your name"
											{...field}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="winner"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Winner 🏆</FormLabel>
										<NationsAutoComplete
											{...field}
											excludedCountries={[
												watchedValues[1], // second
												watchedValues[2], // third
												watchedValues[3], // last
											].filter(Boolean)}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="second"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Second {"\u{1F948}"}</FormLabel>
										<NationsAutoComplete
											{...field}
											excludedCountries={[
												watchedValues[0], // first
												watchedValues[2], // third
												watchedValues[3], // last
											].filter(Boolean)}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="third"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Third {"\u{1F949}"}</FormLabel>
										<NationsAutoComplete
											{...field}
											excludedCountries={[
												watchedValues[0], // second
												watchedValues[1], // second
												watchedValues[3], // last
											].filter(Boolean)}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="last"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Last {"\u{1F4A9}"}</FormLabel>
										<NationsAutoComplete
											{...field}
											excludedCountries={[
												watchedValues[0], // first
												watchedValues[1], // second
												watchedValues[2], // third
											].filter(Boolean)}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button ref={buttonRef} type="submit" className="relative mt-6">
								<div className="absolute inset-0 flex items-center justify-center">
									Submit
								</div>
							</Button>
						</CardContent>
					</form>
				</Form>
			</Card>
		</div>
	);
}
