import { Nav, Provider } from '@/components';
import '@/styles/globals.css';

export const metadata = {
	title: 'Promptopia',
	description: 'Discover & Share AI Prompts',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient"></div>
					</div>
					<main className="app">
						<Nav />

						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}
