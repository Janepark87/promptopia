import { signIn } from 'next-auth/react';

export default function SignInBtn({ providers }) {
	return (
		<>
			{providers &&
				Object.values(providers).map((provider) => (
					<button
						type="button"
						key={provider.name}
						onClick={() => signIn(provider.id)}
						className="black_btn">
						Sign In
					</button>
				))}
		</>
	);
}
