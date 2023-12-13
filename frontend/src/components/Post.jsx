import React, { useState } from 'react';
import VelocidaApi from '../VelocidaApi';

const Post = ({ post }) => {
    const [voted, setVoted] = useState(false);

    const handleVote = async (upvote) => {
        if (!voted) {
            try {
                // Assuming your backend API is running on localhost:3001
                await VelocidaApi.patchVote(post.id, { upvote });
                setVoted(true);
            } catch (error) {
                console.error('Error handling vote:', error);
            }
        }
    };

    const upvotes = post.votes ? post.votes.filter((vote) => vote.upvote).length : 0;
    const downvotes = post.votes ? post.votes.filter((vote) => vote.downvote).length : 0;

    return (
        <div>
            <p>{post.content}</p>
            <p>Author: {post.author.user.username}</p>
            <p>Upvotes: {upvotes}</p>
            <p>Downvotes: {downvotes}</p>
            <button onClick={() => handleVote(true)} disabled={voted}>
                Upvote
            </button>
            <button onClick={() => handleVote(false)} disabled={voted}>
                Downvote
            </button>
        </div>
    );
};

export default Post;