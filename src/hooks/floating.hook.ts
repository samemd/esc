import { type RefObject, useEffect, useState } from "react";

export function useFloating(
	sentinelRef: RefObject<HTMLDivElement | null>,
	observerRoot?: Element | null,
) {
	const [isFloating, setIsFloating] = useState(false);

	useEffect(() => {
		if (!sentinelRef) return;

		const currentSentinel = sentinelRef.current;
		if (!currentSentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsFloating(!entry?.isIntersecting);
			},
			{
				root: observerRoot,
				threshold: 0,
			},
		);

		observer.observe(currentSentinel);
		return () => {
			observer.unobserve(currentSentinel);
		};
	}, [observerRoot, sentinelRef]);

	return isFloating;
}
