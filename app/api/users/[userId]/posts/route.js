import connectMongoDB from '@/lib/db';
import Prompt from '@/models/prompt';

export async function GET(req, { params }) {
	try {
		await connectMongoDB();

		const prompts = await Prompt.find({ creator: params.userId }).populate(
			'creator'
		);

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all prompts.', { status: 500 });
	}
}
