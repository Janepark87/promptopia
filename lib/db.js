import mongoose from 'mongoose';

let isConnected = false;

export default async function connectMongoDB() {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('MongoDB is already connected!');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'promptopia',
		});

		isConnected = true;
		console.log('MongoDB is connected.');
	} catch (error) {
		console.log(error);
	}
}
