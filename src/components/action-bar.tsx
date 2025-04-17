"use client";

import { type ComponentProps, useRef } from "react";
import { useFloating } from "~/hooks/floating.hook";
import { cn } from "~/lib/utils";

export function ActionBar({ children, className }: ComponentProps<"div">) {
	const sentinelRef = useRef<HTMLDivElement>(null);
	const isFloating = useFloating(sentinelRef, null);

	return (
		<>
			<div
				className={cn(
					"sticky bottom-0 flex w-full py-6 transition-shadow duration-100",

					className,
				)}
			>
				<div
					className={cn("w-full rounded-full", {
						"z-50 shadow-[0_0_30px_15px_rgba(52,211,153,0.7)] shadow-black":
							isFloating,
					})}
				>
					{children}
				</div>
			</div>
			<div ref={sentinelRef} />
		</>
	);
}
