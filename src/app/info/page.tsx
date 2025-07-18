// app/event/page.tsx
import {
	Calendar,
	ChefHat,
	CircleDollarSign,
	Clock,
	MapPin,
	Martini,
	Shirt,
} from "lucide-react";
import Image from "next/image";
import ImageGallery from "~/components/image-gallery";
import { Logo } from "~/components/logo";

export default function EventPage() {
	const images = [
		{ src: "/halle2.jpg", alt: "Padel Court 1" },
		{ src: "/halle1.jpg", alt: "Padel Court 2" },
		{ src: "/halle3.jpg", alt: "Padel Court 3" },
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<div className="relative h-64">
				<Image
					src="/banner.webp"
					alt="Padelhalle Klybeck"
					fill
					className="object-cover [object-position:center_70%]"
					priority
				/>
				<div className="justify-startp-4 absolute inset-0 flex flex-col items-center pt-4 text-center">
					<Logo />
					<h1 className="flex flex-col text-balance font-extrabold font-hand text-2xl text-emerald-400 tracking-wider drop-shadow-lg">
						<span>x</span>
						<span>Padelhalle Klybeck</span>
					</h1>
				</div>
			</div>

			{/* Event Details */}
			<div className="mx-auto max-w-[1500px] px-4 py-12 md:py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
					{/* Left Column - Details */}
					<div className="space-y-8">
						<div className="rounded-xl bg-card p-6 shadow-lg">
							<h2 className="mb-6 font-bold font-hand text-2xl text-emerald-400 tracking-wider md:text-3xl">
								Event Details
							</h2>

							<div className="grid grid-cols-2 space-y-4">
								<div className="flex items-start">
									<MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Location</h3>
										<p className="text-gray-300">Padelhalle Klybeck</p>
									</div>
								</div>

								<div className="flex items-start">
									<Calendar className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Date</h3>
										<p className="text-gray-300">May 17, 2025</p>
									</div>
								</div>

								<div className="flex items-start">
									<Clock className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Time</h3>
										<p className="text-gray-300">
											Doors: 19.30 | Viewing 21.00
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<Shirt className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Dresscode</h3>
										<p className="text-gray-300">ESC Extravanganza</p>
									</div>
								</div>

								<div className="flex items-start">
									<Martini className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Drinks</h3>
										<p className="text-gray-300">Bring was du trinkst!</p>
									</div>
								</div>

								<div className="flex items-start">
									<ChefHat className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Food</h3>
										<p className="text-gray-300">
											Komm satt, iss einen Midnight Snack vor Ort
										</p>
									</div>
								</div>

								<div className="col-span-2 flex items-start">
									<CircleDollarSign className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Entry</h3>
										<p className="text-gray-300">
											CHF 20.- Unkostenbeitrag für Organisation & Miete per
											Twint beim Einlass
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Map */}
					<div className="flex flex-col rounded-xl bg-card p-6 shadow-lg">
						<h2 className="mb-6 font-bold font-hand text-2xl text-emerald-400 tracking-wider md:text-3xl">
							Location
						</h2>
						<div className="flex min-h-60 w-full grow-1 overflow-hidden rounded-lg ">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6154.339956377856!2d7.586662776779076!3d47.57464567118695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b90d53cfe26d%3A0xf06863ec5019cd14!2sPadel%20Basel%20Klybeck!5e1!3m2!1sen!2sus!4v1744793634064!5m2!1sen!2sus"
								title="Padel Basel Klybeck"
								allowFullScreen={true}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="h-full w-full border-0 object-cover"
							/>
						</div>
					</div>
					{/* Photos */}
					<ImageGallery images={images} />
				</div>
			</div>
		</div>
	);
}
