/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: process.env.PROTOCOL,
				hostname: process.env.GOOGLE_IMAGE_HOSTNAME,
				port: '',
				pathname: '/**',
			},
		],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
};

export default nextConfig;
