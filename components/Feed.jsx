'use client';
import { useEffect, useRef, useState } from 'react';
import { PromptCardList } from '.';

export default function Feed() {
	const searchInputRef = useRef();
	const [posts, setPosts] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchedResults, setSearchedResults] = useState([]);
	const [tag, setTag] = useState('');

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();
			setPosts(data);
			setSearchedResults(data);
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		if (searchInputRef.current) searchInputRef.current.focus();
	}, []);

	useEffect(() => {
		if (tag === '') setSearchedResults(posts);
		else {
			searchInputRef.current.focus();
			getSearchResults(tag);
		}
	}, [tag]);

	const filterPrompts = () => {
		const regex = new RegExp(searchText, 'i');
		return posts.filter(
			(post) =>
				regex.test(post.creator.username) ||
				regex.test(post.tag) ||
				regex.test(post.prompt)
		);
	};

	const getSearchResults = (searchtext) => {
		const filteredBySearch = filterPrompts(searchtext);
		setSearchedResults(filteredBySearch);
	};

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchText(value);

		if (value === '') setSearchedResults(posts);
	};

	const handleSearchKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			getSearchResults(searchText);
		}
	};

	const handleTagClick = (tagName) => {
		setTag(tagName);
		setSearchText(tagName);
	};

	return (
		<section className="feed">
			<form
				onKeyDown={handleSearchKeyDown}
				className="flex-center relative w-full">
				<input
					ref={searchInputRef}
					type="text"
					value={searchText}
					onChange={handleSearchChange}
					placeholder="Search for a tag or a username!"
					className="search_input peer"
				/>
			</form>

			{searchText && searchedResults.length === 0 ? (
				<p className="mt-5 text-center">No results found</p>
			) : (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			)}
		</section>
	);
}
