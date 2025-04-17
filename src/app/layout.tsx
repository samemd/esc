import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Shadows_Into_Light } from "next/font/google";

import { LogOut } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { ReactNode } from "react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/sonner";
import logout from "~/server/actions/logout";
import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	title: "ESC Basel X Padelhalle Klybeck",
	description: "Place your ESC bets!",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const shadowIntoLight = Shadows_Into_Light({
	subsets: ["latin"],
	variable: "--font-shadow-into-light",
	weight: "400",
});

export default async function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	const session = await auth();

	return (
		<html
			lang="en"
			className={`${geist.variable} ${shadowIntoLight.variable} antialiased`}
		>
			<Head>
				<title>ESC BASEL 2025 - PadelHalle Klybeck</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<body>
				<TRPCReactProvider>
					<SessionProvider session={session}>
						<Navigation />
						<div className="pt-0 pb-16 md:pt-16 md:pb-0">
							<div className="relative min-h-(--min-height) w-full bg-gradient-to-b from-black to-[#15162c]">
								<form action={logout} className="absolute right-10 bottom-10">
									<Button>
										<LogOut />
									</Button>
								</form>
								{children}
							</div>
						</div>

						<Toaster
							theme="dark"
							position="bottom-right"
							mobileOffset={{ bottom: 80 }}
							richColors
						/>
					</SessionProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
