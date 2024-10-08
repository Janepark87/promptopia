import { Feed } from '@/components';

export default function Home() {
	return (
		<section className="flex-center w-full flex-col">
			<h1 className="head_text text-center">
				<span className="mr-4 md:mr-0 md:block">Discover & Share</span>
				<span className="orange_gradient text-center">
					AI-Powered Prompts
				</span>
			</h1>
			<p className="desc text-center">
				Promptopia is an open-source AI prompting tool for modern world
				to discover, create and share creative prompts
			</p>

			<Feed />
		</section>
	);
}
