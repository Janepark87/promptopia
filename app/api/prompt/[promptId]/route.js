import connectMongoDB from '@/lib/db';
import Prompt from '@/models/prompt';

export async function GET(req, { params }) {
	try {
		await connectMongoDB();

		const prompt = await Prompt.findById(params.promptId).populate(
			'creator'
		);

		if (!prompt) new Response('Prompt not found.', { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch a prompt.', { status: 500 });
	}
}

// PATCH(update)
export async function PATCH(req, { params }) {
	const { prompt, tag } = await req.json();
	try {
		await connectMongoDB();

		const exsistingPrompt = await Prompt.findById(params.promptId);

		if (!exsistingPrompt)
			new Response('Prompt not found.', { status: 404 });

		exsistingPrompt.prompt = prompt;
		exsistingPrompt.tag = tag;
		await exsistingPrompt.save(); // save the updated prompt

		return new Response(JSON.stringify(exsistingPrompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to update prompt.', { status: 500 });
	}
}

// DELETE
export async function DELETE(req, { params }) {
	try {
		await connectMongoDB();

		await Prompt.findByIdAndDelete(params.promptId);

		return new Response('Prompt deleted successfuly.', { status: 200 });
	} catch (error) {}
	return new Response('Failed to delete prompt.', { status: 500 });
}
