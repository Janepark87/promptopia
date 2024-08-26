import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectMongoDB from '@/lib/db';
import User from '@/models/user';

const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
				},
			},
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email,
			});

			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }) {
			try {
				await connectMongoDB();

				// check if a user already exists
				const userExists = await User.findOne({ email: profile.email });

				// if not, create a new user
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(' ', '').toLowerCase(),
						image: profile.picture,
					});
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
