import { PromptCard } from '.';

export default function PromptCardList({ data, handleTagClick }) {
	return (
		<div className="prompt_layout mt-16">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
}
