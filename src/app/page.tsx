import { Suspense } from "react";
import { BannerVideo } from "~/components/banner-video";
import { HomePage } from "~/components/home-page";

export default async function Home() {
	return (
		<main className="flex flex-col">
			<Suspense>
				<BannerVideo className=" w-full" />
			</Suspense>
			<Suspense>
				<HomePage />
			</Suspense>
		</main>
	);
}
