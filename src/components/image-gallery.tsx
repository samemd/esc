"use client";

import Image from "next/image";
import { useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ImageGalleryProps {
	images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [reorderedImages, setReorderedImages] = useState(images);

	const openDialogWithImage = (index: number) => {
		// Rearrange the images array to start with the clicked image
		const newOrder = [...images.slice(index), ...images.slice(0, index)];
		setReorderedImages(newOrder);
		setIsDialogOpen(true);
	};

	return (
		<div className="rounded-xl bg-card p-6 shadow-lg">
			<h2 className="mb-6 font-bold font-hand text-2xl text-emerald-400 tracking-wider md:text-3xl">
				The Venue
			</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{/* Mobile & Desktop View */}
				{images.map((image, index) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="relative h-64 cursor-pointer overflow-hidden rounded-lg md:h-40"
						onClick={() => openDialogWithImage(index)}
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							className="object-cover transition-transform duration-300 hover:scale-105"
						/>
					</div>
				))}
			</div>

			{/* Full-Screen Dialog with Carousel */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-sm:h-dvh">
					<DialogHeader>
						<DialogTitle>The Venue</DialogTitle>
					</DialogHeader>
					<div className="flex h-full w-full items-center justify-center">
						<Carousel
							className="w-full max-w-screen md:max-w-[75vw]"
							// initialSlide={currentImageIndex} // Start carousel at the clicked image
						>
							<CarouselContent>
								{reorderedImages.map((image, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<CarouselItem key={index}>
										<div className="relative aspect-[1.5] w-full overflow-hidden rounded-lg">
											<Image
												src={image.src}
												alt={image.alt}
												fill
												className="object-cover"
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
