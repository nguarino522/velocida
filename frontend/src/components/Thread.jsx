import React from 'react';
import Post from './Post';

const Thread = ({ thread, handleVote }) => {
    return (
        <div>
            <h2>{thread.title}</h2>
            {thread.posts.map((post) => (
                <ThreadPost key={post.id} post={post} handleVote={handleVote} />
            ))}
        </div>
    );
};

export default Thread;