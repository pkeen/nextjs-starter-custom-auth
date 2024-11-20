import SignInForm from "@/lib/components/SignInForm";

type Props = {};

const SignIn = (props: Props) => {
	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<SignInForm />
		</main>
	);
};

export default SignIn;
