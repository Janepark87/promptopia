import Link from 'next/link';

export default function Form({
	type,
	post,
	setPost,
	submitting,
	handleSubmit,
}) {
	return (
		<section className="flex-start mx-auto w-full max-w-full flex-col md:max-w-2xl">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type}</span> Post
			</h1>

			<p className="desc text-left">
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered plateform.
			</p>

			<form
				onSubmit={handleSubmit}
				className="glassmorphism mt-10 flex w-full flex-col gap-7">
				<label>
					<span className="font-satoshi text-base font-semibold text-gray-700">
						Your AI Prompt
					</span>
					<textarea
						name={post.prompt}
						value={post.prompt}
						onChange={(e) =>
							setPost({ ...post, prompt: e.target.value })
						}
						className="form_textarea"
						placeholder="Write your prompt here..."
						required
					/>
				</label>

				<label>
					<span className="font-satoshi text-base font-semibold text-gray-700">
						Tag{' '}
						<span className="font-normal">
							(#product#webdevelopment#idea)
						</span>
					</span>

					<input
						type="text"
						name={post.tag}
						value={post.tag}
						onChange={(e) =>
							setPost({ ...post, tag: e.target.value })
						}
						className="form_input"
						placeholder="#tag"
						required
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-sm text-gray-500">
						Cancel
					</Link>

					<button
						type="submit"
						className="bg-primary-orange rounded-full px-5 py-1.5 text-sm text-white"
						disabled={submitting}>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
}
