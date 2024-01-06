import { LoginForm } from "@/components";

export default function LoginPage() {
	return (
		<div className="center">
			<div className="w-80 flex flex-col bg-white rounded px-8 py-6">
				<h1 className="mb-4 text-3xl font-semibold text-gray-900">Login</h1>
				<LoginForm />
			</div>
		</div>
	);
}
