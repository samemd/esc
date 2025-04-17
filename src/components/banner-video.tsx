"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export function BannerVideo({
	className,
}: {
	className?: string;
	overlayText?: string;
}) {
	const [textVisible, setTextVisible] = useState(false);

	useEffect(() => {
		// Function to handle one complete cycle
		const runCycle = () => {
			// Hide text
			setTextVisible(false);

			// Show text after 3.5 seconds
			const showTimeout = setTimeout(() => {
				setTextVisible(true);

				// Hide text after being visible for 6.5 seconds
				const hideTimeout = setTimeout(() => {
					setTextVisible(false);
				}, 6500);

				return () => clearTimeout(hideTimeout);
			}, 3500);

			return () => clearTimeout(showTimeout);
		};

		// Run the cycle immediately when component mounts
		const cleanupFirstCycle = runCycle();

		// Then set up the repeating cycle every 10 seconds (3.5s hidden + 6.5s visible)
		const intervalId = setInterval(runCycle, 10000);

		return () => {
			cleanupFirstCycle();
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="relative h-[45vh] w-full">
			{/* Video background */}
			<video
				autoPlay
				loop
				muted
				playsInline
				className={cn(
					"absolute inset-0 h-full w-full object-cover [object-position:center_70%]",
					className,
				)}
			>
				<source
					src="https://eurovision-basel.ch/wp-content/uploads/2024/12/ESC2025_KeyVisual.mp4"
					type="video/mp4"
				/>
			</video>

			{/* Transparent overlay image with text */}
			<div
				className={cn(
					"absolute inset-0 h-full w-full",
					"transition-opacity duration-200",
					textVisible ? "opacity-100" : "opacity-0",
				)}
			>
				<Image
					src="/title.webp" // Create this transparent PNG with text positioned exactly where you want it
					alt="Padelhalle Klybeck"
					fill
					style={{
						objectFit: "cover",
						objectPosition: "center 70%",
						opacity: textVisible ? 1 : 0,
					}}
					priority
				/>
			</div>
		</div>
	);
}
