import { LoginForm } from "~/components/login";

export default function LoginPage() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-b from-black to-[#15162c] p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<LoginForm />
			</div>
		</div>
	);
}
