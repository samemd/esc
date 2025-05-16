"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { NationsAutoComplete } from "~/components/primitives/nations";
import { Button } from "~/components/ui/button";
import {
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { useConfetti } from "~/hooks/confetti";
import { BetSchema } from "~/lib/schemas";
import { api } from "~/trpc/react";

export function BetForm() {
	const utils = api.useUtils();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { trigger } = useConfetti(buttonRef);
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const [bet] = api.bet.getForUser.useSuspenseQuery();
	const [user] = api.user.get.useSuspenseQuery();

	const { mutate: submitBet } = api.bet.submit.useMutation({
		onMutate: () => {
			trigger();
		},
		onSuccess: () => {
			void utils.bet.getForUser.invalidate();

			toast.success("Vote submitted");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const { mutate: deleteBet } = api.bet.delete.useMutation({
		onSuccess: async () => {
			await utils.bet.getForUser.invalidate();
			form.reset();
			toast.success("Bet deleted");
		},
	});

	const form = useForm<z.infer<typeof BetSchema>>({
		resolver: zodResolver(BetSchema),
		defaultValues: {
			name: user?.name ?? "",
			winner: bet?.winner,
			second: bet?.second,
			third: bet?.third,
			last: bet?.last,
			winningScore: bet?.winningScore ?? "",
		},
	});

	function onSubmit(data: z.infer<typeof BetSchema>) {
		submitBet(data);
	}

	return (
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
					<CardDescription>
						<div>Wer gewinnt den ESC 2025?</div>
						<div className="mt-4 text-balance text-sm">
							Du kannst deine Auswahl jederzeit anpassen bis zum Ende des
							offiziellen Votings.
						</div>
					</CardDescription>
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
						name="winningScore"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<div className="flex justify-between">
									<FormLabel>Winning Score</FormLabel>
									<TooltipProvider delayDuration={10}>
										<Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
											<TooltipTrigger asChild>
												<button
													type="button"
													className="cursor-pointer"
													onClick={() => setTooltipOpen(true)}
												>
													<Info className="text-gray-400" />
												</button>
											</TooltipTrigger>
											<TooltipContent>
												<p className="flex flex-col whitespace-pre-line text-xs">
													{`Jede Nation verteilt 2 x 12 Punkte (Jury, Publikum). 
													Bei 37 Teilnehmern sind das maximal 888 Punkte. 
													Nemo gewann 2024 mit 591 Punkten.`}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<Input
									className="rounded-full border-ring bg-background [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
									type="number"
									placeholder="How many points will the winner get?"
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
								<NationsAutoComplete {...field} />
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
								<NationsAutoComplete {...field} />
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
								<NationsAutoComplete {...field} />
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
								<NationsAutoComplete {...field} />
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
	);
}
