import { Home } from "lucide-react";
import Link from "next/link";
import { auth } from "~/server/auth";

export async function Navigation() {
	const session = await auth();

	return (
		<div className="fixed bottom-0 left-0 z-50 flex w-full px-1 pb-[env(safe-area-inset-bottom)] md:top-0 md:bottom-full md:px-0">
			<nav className="flex h-16 w-full items-center justify-around bg-black px-4 font-bold font-hand text-2xl text-emerald-400 tracking-widest shadow-md max-sm:rounded-t-2xl">
				<Link href="/info" className="flex flex-col items-center">
					Info
				</Link>
				<Link href="/" className="flex items-center rounded-full">
					<Home size={34} strokeWidth={2} className="-mt-px mb-px" />
				</Link>
				<Link href="/bets" className="flex flex-col items-center">
					Bets
				</Link>
				{session?.user?.isAdmin && (
					<Link href="/admin" className="flex flex-col items-center">
						Admin
					</Link>
				)}
			</nav>
		</div>
	);
}
