'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Profile } from '@/components';

export default function MyProfile() {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	const handleEdit = async (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			'Are you sure you want to delete this prompt?'
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});

				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`/api/users/${session?.user.id}/posts`
			);
			const data = await response.json();
			setPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, []);

	return (
		<div>
			<Profile
				name="my"
				desc="Welcome to your personalized profile page."
				posts={posts}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
}
