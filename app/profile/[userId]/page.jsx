'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Profile } from '@/components';

export default function UserProfile({ params }) {
	const searchParams = useSearchParams();
	const name = searchParams.get('name');
	const username = name[0].toUpperCase() + name.slice(1);
	const [userPosts, setUserPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params?.userId}/posts`);
			const data = await response.json();
			setUserPosts(data);
		};

		if (params?.userId) fetchPosts();
	}, [params.userId]);

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
			posts={userPosts}
		/>
	);
}
