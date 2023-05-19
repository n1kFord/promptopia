"use client";

import { filterItems } from "@utils/filterItems";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [localPosts, setLocalPosts] = useState([]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleTagClick = (text) => {
        setSearchText(`#${text}`);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();

            setPosts(data);
            setLocalPosts(data);
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (posts) {
            const Debounce = setTimeout(() => {
                const isTag = searchText.startsWith("#");
                const filteredPosts = filterItems(searchText, posts, isTag);
                setLocalPosts(filteredPosts);
            }, 500);
            return () => clearTimeout(Debounce);
        }
    }, [searchText]);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList data={localPosts} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
