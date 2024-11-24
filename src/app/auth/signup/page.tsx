import SignUpForm from "@/lib/components/SignUpForm";

type Props = {};

const SignUpPage = (props: Props) => {
	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<SignUpForm />
		</main>
	);
};

export default SignUpPage;
