"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { isAfter } from "date-fns";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface CountdownProps {
	title?: string;
	targetDate?: Date | null;
	size?: "sm" | "md";
	className?: string;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
	const difference = targetDate.getTime() - new Date().getTime();

	if (difference <= 0) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	}

	return {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((difference / (1000 * 60)) % 60),
		seconds: Math.floor((difference / 1000) % 60),
	};
};

const padValue = (value: number) => String(value).padStart(2, "0");

export function Countdown({
	targetDate,
	size = "md",
	title,
	className,
}: CountdownProps) {
	const [parent] = useAutoAnimate({ duration: 200 });
	if (!targetDate) return null;

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(
		calculateTimeLeft(targetDate),
	);

	// This flag helps us ensure that the countdown is rendered only on the client.
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft(targetDate));
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	return (
		<div ref={parent} className="flex">
			{mounted && !isAfter(new Date(), targetDate) && (
				<div
					className={cn(
						"flex flex-col items-center justify-center gap-6 rounded-xl border bg-card p-8 shadow-md",
						{ "md:w-md": size === "sm" },
						className,
					)}
				>
					{title && (
						<p
							className={cn({
								"text-lg": size === "md",
								"text-sm": size === "sm",
							})}
						>
							{title}
						</p>
					)}

					<div
						className={cn("grid grid-cols-4", {
							"gap-x-2": size === "sm",
							"gap-x-2 md:gap-x-8": size === "md",
						})}
					>
						<Counter label="Days" value={timeLeft.days} size={size} />
						<Counter label="Hours" value={timeLeft.hours} size={size} />
						<Counter label="Minutes" value={timeLeft.minutes} size={size} />
						<Counter label="Seconds" value={timeLeft.seconds} size={size} />
					</div>
				</div>
			)}
		</div>
	);
}

function Counter({
	label,
	value,
	size = "md",
}: { label: string; value: number; size?: "sm" | "md" }) {
	return (
		<div className="flex flex-col items-center">
			<div
				className={cn("inline-block text-center font-light tabular-nums ", {
					"w-14 text-lg md:w-20 md:text-xl": size === "sm",
					"w-18 text-2xl md:w-24 md:text-7xl": size === "md",
				})}
			>
				{padValue(value)}
			</div>
			<div
				className={cn({ "text-sm": size === "sm", "text-base": size === "md" })}
			>
				{label}
			</div>
		</div>
	);
}
