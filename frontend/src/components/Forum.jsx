import React, { useEffect, useState } from 'react';
import VelocidaApi from '../VelocidaApi';
import LoadingSpinner from "./LoadingSpinner";
import { Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import moment from 'moment';

const Forum = () => {
    const [threads, setThreads] = useState([]);
    const [threadsLoaded, setThreadsLoaded] = useState(false);
    const { page_num } = useParams();

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                if (page_num === "1") {
                    const currentThreads = await VelocidaApi.getThreads(0);
                    setThreads(currentThreads);
                } else {
                    const currentThreads = await VelocidaApi.getThreads(((page_num-1) * 20));
                    setThreads(currentThreads);
                }
            } catch (error) {
                console.error('Error fetching threads:', error);
            }
            setThreadsLoaded(true)
        };

        fetchThreads();
        setThreadsLoaded(false)
    }, [page_num]);

    const convertToTimeSince = (time) => {
        const timeAgo = moment(time).fromNow();
        return timeAgo
    }

    if (!threadsLoaded) return <LoadingSpinner />;

    return (
        <div>
            <h1>Latest Active Threads on Velocida:</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Number Of Posts</th>
                        <th>Author</th>
                        <th>Updated At</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {threads.map((thread) => (
                        <tr key={thread.id}>
                            <td><a className="card-text" style={{color: "#72A276"}} href={`/thread/${thread.id}`}>{thread.title}</a></td>
                            <td>{Object.keys(thread.posts).length}</td>
                            <td>{thread.author.user.username}</td>
                            <td>{convertToTimeSince(thread.updatedAt)}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Forum;