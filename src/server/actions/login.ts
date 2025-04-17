"use server";

import { signIn } from "~/server/auth";

export async function googleLogin(formData: FormData) {
	const redirectTo = formData.get("redirectTo")?.toString() || "/";
	console.log("redirectTo", redirectTo);
	await signIn("google", { redirectTo: "/bets" });
}

export async function resendLogin(formData: FormData) {
	const redirectTo = formData.get("redirectTo")?.toString() || "/";
	console.log("redirectTo", redirectTo);
	const email = formData.get("email");

	await signIn("resend", { email }, { redirectTo: "/bets" });
}
