import confetti from "canvas-confetti";
import type { RefObject } from "react";

export function useConfetti(ref: RefObject<HTMLElement | null>) {
	const trigger = () => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;

		const defaults = {
			spread: Math.random() * 100 + 260,
			gravity: 0.5,
			startVelocity: 25,
		};

		const shoot = () => {
			confetti({
				...defaults,
				particleCount: 40,
				scalar: 1.2,
				origin: {
					x: x / window.innerWidth,
					y: y / window.innerHeight,
				},
			});

			confetti({
				...defaults,
				particleCount: 10,
				scalar: 0.75,
				origin: {
					x: x / window.innerWidth,
					y: y / window.innerHeight,
				},
			});
		};

		setTimeout(shoot, 0);
		setTimeout(shoot, 75);
		setTimeout(shoot, 150);
	};

	return { trigger };
}
