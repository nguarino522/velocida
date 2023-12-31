import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';
import VelocidaApi from '../VelocidaApi';
import LoadingSpinner from './LoadingSpinner';

const Thread = ({ showToast }) => {
    const [thread, setThread] = useState(null);
    const { id } = useParams();
    const [threadLoaded, setThreadLoaded] = useState(false);

    useEffect(() => {
        async function retrieveThread() {
            try {
                let result = await VelocidaApi.getThread(id);
                setThread(result);
            } catch (error) {
                console.error("Error retrieving thread:", error);
            }
            setThreadLoaded(true)
        }

        // Make sure the id exists before attempting to fetch the thread
        if (id) {
            retrieveThread();
        }

        setThreadLoaded(false)
    }, [id]);

    if (!threadLoaded) return <LoadingSpinner />;

    return (
        <div>
            <h2>{thread.title}</h2>
            {thread.posts.map((post) => (
                <div className="container" key={post.id}>
                    <Post post={post} showToast={showToast} />
                </div>
            ))}
        </div>
    );
};

export default Thread;