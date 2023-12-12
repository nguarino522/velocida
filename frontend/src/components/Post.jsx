import React, { useState } from 'react';

const Post = ({ post, handleVote }) => {
    const [voted, setVoted] = useState(false);

    const handleUpvote = () => {
        if (!voted) {
            handleVote(post.id, true); // Assuming true represents an upvote
            setVoted(true);
        }
    };

    const handleDownvote = () => {
        if (!voted) {
            handleVote(post.id, false); // Assuming false represents a downvote
            setVoted(true);
        }
    };

    return (
        <div>
            <p>{post.content}</p>
            <p>Author: {post.author.name}</p>
            <p>Upvotes: {post.votes.filter((vote) => vote.upvote).length}</p>
            <button onClick={handleUpvote} disabled={voted}>
                Upvote
            </button>
            <button onClick={handleDownvote} disabled={voted}>
                Downvote
            </button>
        </div>
    );
};

export default Post;