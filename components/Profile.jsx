import Link from 'next/link';
import { PromptCard } from '.';

export default function Profile({
	name,
	desc,
	posts,
	handleEdit,
	handleDelete,
}) {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="desc text-left">{desc}</p>
			{posts.length === 0 && (
				<>
					<p className="desc !mt-0 space-y-6 py-8">
						📝 No prompts yet. Let's create
						<Link href="/create-prompt" className="ml-1 underline">
							a new prompt.
						</Link>
					</p>
				</>
			)}
			{posts && (
				<div className="prompt_layout mt-16">
					{posts.map((post) => (
						<PromptCard
							key={post._id}
							post={post}
							handleEdit={() => handleEdit && handleEdit(post)}
							handleDelete={() =>
								handleDelete && handleDelete(post)
							}
						/>
					))}
				</div>
			)}
		</section>
	);
}
