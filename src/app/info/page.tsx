import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import Image from "next/image";
import { Logo } from "~/components/logo";

export default function EventPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<div className="relative h-64">
				<Image
					src="/banner.webp"
					alt="PadelHalle Klybeck"
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
			<div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
					{/* Left Column - Details */}
					<div className="space-y-8">
						<div className="rounded-xl bg-card p-6 shadow-lg">
							<h2 className="mb-6 font-bold font-hand text-2xl text-emerald-400 tracking-wider md:text-3xl">
								Event Details
							</h2>

							<div className="space-y-4">
								<div className="flex items-start">
									<MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Location</h3>
										<p className="text-gray-300">PadelHalle Klybeck</p>
										<p className="text-gray-400 text-sm">
											Gebäude K-102, Klybeckstrasse 141, 4057 Basel
										</p>
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
										<p className="text-gray-300">Starting at 19:30</p>
									</div>
								</div>

								<div className="flex items-start">
									<Shirt className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-300" />
									<div className="ml-4">
										<h3 className="font-semibold text-xl">Dresscode</h3>
										<p className="text-gray-300">Flamboyant</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-xl bg-card p-6 shadow-lg">
							<div className="flex items-start">
								<div className="">
									<h2 className="mb-6 font-bold font-hand text-2xl text-emerald-400 tracking-wider md:text-3xl">
										Important Information
									</h2>
									<ul className="list-inside list-disc space-y-2 text-gray-300">
										<li>Please bring your own beverages and snacks</li>
										<li>Please clean up after yourself</li>
										<li>...</li>
										<li>...</li>
										<li>...</li>
										<li>...</li>
										<li>...</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Map & Photos */}
					<div className="space-y-8">
						{/* Map */}
						<div className="rounded-xl bg-card p-6 shadow-lg">
							<h2 className="mb-6 font-bold font-hand text-2xl text-emerald-400 tracking-wider md:text-3xl">
								Location
							</h2>
							<div className="h-64 w-full overflow-hidden rounded-lg md:h-80">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6154.339956377856!2d7.586662776779076!3d47.57464567118695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b90d53cfe26d%3A0xf06863ec5019cd14!2sPadel%20Basel%20Klybeck!5e1!3m2!1sen!2sus!4v1744793634064!5m2!1sen!2sus"
									title="Padel Basel Klybeck"
									width="600"
									height="450"
									style={{ border: 0 }}
									allowFullScreen={true}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
						</div>

						{/* Photos */}
						<div className="rounded-xl bg-card p-6 shadow-lg">
							<h2 className="mb-6 font-bold font-hand text-2xl text-emerald-400 tracking-wider md:text-3xl">
								The Venue
							</h2>
							<div className="grid grid-cols-1 gap-4">
								<div className="relative h-64 overflow-hidden rounded-lg md:hidden">
									<Image
										src="/halle1.jpg"
										alt="Padel Court"
										fill
										className="rounded-lg object-cover"
									/>
									<div className="absolute right-4 bottom-4 flex space-x-2">
										<span className="h-2 w-2 rounded-full bg-white opacity-100"/>
										<span className="h-2 w-2 rounded-full bg-white opacity-50"/>
										<span className="h-2 w-2 rounded-full bg-white opacity-50"/>
									</div>
								</div>

								<div className="hidden grid-cols-3 gap-3 md:grid">
									<div className="relative h-40 overflow-hidden rounded-lg">
										<Image
											src="/halle1.jpg"
											alt="Padel Court 1"
											fill
											className="object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
									<div className="relative h-40 overflow-hidden rounded-lg">
										<Image
											src="/halle2.jpg"
											alt="Padel Court 2"
											fill
											className="object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
									<div className="relative h-40 overflow-hidden rounded-lg">
										<Image
											src="/halle1.jpg"
											alt="Padel Court 3"
											fill
											className="object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
