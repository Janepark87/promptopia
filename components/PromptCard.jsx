'use client';

import { images } from '@/constants';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function PromptCard({
	post,
	handleTagClick,
	handleEdit,
	handleDelete,
}) {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const [copied, setCopied] = useState('');

	const {
		creator: { _id: creatorId, username, email, image },
		prompt,
		tag,
	} = post;

	const handleCopyClick = () => {
		setCopied(prompt);
		navigator.clipboard.writeText(prompt);
		setTimeout(() => setCopied(''), 3000);
	};

	const handleProfileClick = () => {
		if (creatorId === session?.user.id) return router.push('/profile');
		router.push(`/profile/${creatorId}?name=${username}`);
	};

	return (
		<div className="prompt_card">
			<div className="flex items-start justify-between gap-5">
				<div
					onClick={handleProfileClick}
					className="flex flex-1 cursor-pointer items-center justify-start gap-3">
					<Image
						src={image}
						alt={`${username} avatar`}
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{username}
						</h3>

						<p className="font-inter text-sm text-gray-500">
							{email}
						</p>
					</div>
				</div>

				<button
					type="button"
					className="copy_btn"
					onClick={handleCopyClick}
					aria-label="Copy the prompt">
					<Image
						src={copied === prompt ? images.tick : images.copy}
						alt="copy icon"
						width={12}
						height={12}
					/>
				</button>
			</div>

			<p className="font-satoshi my-4 text-sm text-gray-700">{prompt}</p>
			<p
				className="font-inter blue_gradient cursor-pointer text-sm"
				onClick={() => handleTagClick && handleTagClick(tag)}>
				#{tag}
			</p>

			{/* for profile page */}
			{session?.user.id === creatorId && pathName === '/profile' && (
				<div className="flex-end mt-3 gap-4 border-t border-gray-100 pt-3">
					<p
						className="font-inter green_gradient cursor-pointer text-sm"
						onClick={handleEdit}>
						Edit
					</p>
					<p
						className="font-inter orange_gradient cursor-pointer text-sm"
						onClick={handleDelete}>
						Delete
					</p>
				</div>
			)}
		</div>
	);
}
