'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Form } from '@/components';

export default function CreatePrompt() {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({ prompt: '', tag: '' });

	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			// create a new post
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user.id,
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) router.push('/');
		} catch (error) {
			console.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
}
