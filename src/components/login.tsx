"use client";

import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { googleLogin, resendLogin } from "~/server/actions/login";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirectTo") || "/";

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden py-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<div className="px-8 py-10 md:px-10 md:py-16">
						<form className="flex flex-col gap-6" action={resendLogin}>
							<div className="mb-6 flex flex-col items-center text-center">
								<h1 className="font-bold text-4xl">Welcome!</h1>
								<p className="text-balance text-muted-foreground">
									Login to your ESC account
								</p>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="nemo@esc.ch"
									required
								/>
							</div>
							<input type="hidden" name="redirectTo" value={redirectTo} />
							<Button type="submit" className="w-full">
								Login
							</Button>
						</form>
						<div className="relative flex items-center justify-center py-10 text-center text-sm">
							<span className="w-full border-muted-foreground/50 border-b" />
							<span className="relative z-10 shrink-0 px-2 text-muted-foreground">
								Or continue with
							</span>
							<span className="w-full border-muted-foreground/50 border-b" />
						</div>
						<form className="grid" action={googleLogin}>
							<input type="hidden" name="redirectTo" value={redirectTo} />
							<Button type="submit" variant="outline" className="w-full">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<title>Google Logo</title>
									<path
										d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
										fill="currentColor"
									/>
								</svg>
								<div className="">Login with Google</div>
							</Button>
						</form>
					</div>
					<div className="relative hidden bg-muted md:block">
						<img
							src="/flyer.jpeg"
							alt="Flyer"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
