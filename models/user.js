import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
	username: {
		type: String,
		runiqued: [true, 'Username is required!'],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			'Ussername invalid, it should contain 8-20 alphanumeric letters and be unique!',
		],
	},
	email: {
		type: String,
		unique: [true, 'Email already exists!'],
		runiqued: [true, 'Email is required!'],
	},
	image: {
		type: String,
	},
});

const User = models.User || model('User', UserSchema);
export default User;
