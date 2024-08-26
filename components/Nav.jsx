'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut, getProviders } from 'next-auth/react';
import { images } from '@/constants';
import { SignInBtn } from '.';

export default function Nav() {
	const { data: session } = useSession();
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setupProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};

		setupProviders();
	}, []);

	return (
		<nav className="flex-between mb-16 w-full pt-3">
			<Link href="/" className="flex-center flex gap-2">
				<Image
					src={images.logo}
					alt="Promptopia logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop navigation */}
			<div className="hidden sm:flex">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/profile">
							<Image
								src={session?.user.image}
								alt="Profile"
								width={37}
								height={37}
								className="rounded-full"
							/>
						</Link>

						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>

						<button
							type="button"
							onClick={signOut}
							className="outline_btn">
							Sign Out
						</button>
					</div>
				) : (
					<SignInBtn providers={providers} />
				)}
			</div>

			{/* Mobile navigation */}
			<div className="relative flex sm:hidden">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							alt="Promptopia logo"
							width={30}
							height={30}
							className="rounded-full object-contain"
							onClick={() =>
								setToggleDropdown((toggle) => !toggle)
							}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}>
									Create Prompt
								</Link>
								<button
									type="button"
									className="black_btn mt-5 w-full"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<SignInBtn providers={providers} />
				)}
			</div>
		</nav>
	);
}
