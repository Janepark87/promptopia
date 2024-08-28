import connectMongoDB from '@/lib/db';
import Prompt from '@/models/prompt';

export async function POST(req) {
	const { userId, prompt, tag } = await req.json();

	try {
		await connectMongoDB(); // connect to the mongo database
		const newPropmt = new Prompt({
			creator: userId,
			prompt,
			tag,
		});

		await newPropmt.save(); // save a new prompt in the database
		return new Response(JSON.stringify(newPropmt), { status: 201 });
	} catch (error) {
		return new Response('Failed to create a new prompt', { status: 500 });
	}
}
