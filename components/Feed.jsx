'use client';
import { useEffect, useState } from 'react';
import { PromptCardList } from '.';

export default function Feed() {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		e.preventDefault();
		setSearchText(e.target.value);
	};

	const handleTagClick = () => {};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();
			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="flex-center relative w-full">
				<input
					type="text"
					value={searchText}
					onChange={handleSearchChange}
					placeholder="Search for a tag or a username!"
					className="search_input peer"
				/>
			</form>

			<PromptCardList data={posts} handleTagClick={handleTagClick} />
		</section>
	);
}
