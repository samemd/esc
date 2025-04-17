"use server";

import { signIn } from "~/server/auth";

export async function googleLogin(formData: FormData) {
	const redirectTo = formData.get("redirectTo")?.toString() || "/";
	await signIn("google", { redirectTo });
}

export async function resendLogin(formData: FormData) {
	const redirectTo = formData.get("redirectTo")?.toString() || "/";
	const email = formData.get("email");

	await signIn("resend", { email, redirectTo });
}
