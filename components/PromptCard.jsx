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
	const router = useRouter();
	const pathname = usePathname();
	const [copied, setCopied] = useState('');
	const {
		creator: { username, email, image },
		prompt,
		tag,
	} = post;

	const handleCopyClick = () => {
		setCopied(prompt);
		navigator.clipboard.writeText(prompt);
		setTimeout(() => setCopied(''), 3000);
	};

	return (
		<div className="prompt_card">
			<div className="flex items-start justify-between gap-5">
				<div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
					<Image
						src={image}
						alt="user image"
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

				<div className="copy_btn" onClick={handleCopyClick}>
					<Image
						src={copied === prompt ? images.tick : images.copy}
						width={12}
						height={12}
					/>
				</div>
			</div>

			<p className="font-satoshi my-4 text-sm text-gray-700">{prompt}</p>
			<p
				className="font-inter blue_gradient cursor-pointer text-sm"
				onClick={() => handleTagClick && handleTagClick(tag)}>
				{tag}
			</p>
		</div>
	);
}
