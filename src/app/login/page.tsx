import LoginForm from "@/lib/components/LoginForm";

type Props = {};

const Login = (props: Props) => {
	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<LoginForm />
		</main>
	);
};

export default Login;
