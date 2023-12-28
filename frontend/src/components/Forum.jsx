import React, { useEffect, useState } from 'react';
import VelocidaApi from '../VelocidaApi';
import LoadingSpinner from "./LoadingSpinner";
import { Table, Button } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';
import NewThreadModal from './NewThreadModal';  // Import the new modal component
import './Forum.css';

const Forum = ({ showToast }) => {
    const [threads, setThreads] = useState([]);
    const [threadsLoaded, setThreadsLoaded] = useState(false);
    const { page_num } = useParams();
    const navigate = useNavigate();
    const [showNewThreadModal, setShowNewThreadModal] = useState(false);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                let currentThreads;
                if (page_num === "1") {
                    currentThreads = await VelocidaApi.getThreads(0);
                } else {
                    currentThreads = await VelocidaApi.getThreads(((page_num - 1) * 20));
                }
                setThreads(currentThreads);
            } catch (error) {
                console.error('Error fetching threads:', error);
            }
            setThreadsLoaded(true);
        };

        fetchThreads();
    }, [page_num]);

    const convertToTimeSince = (time) => {
        const timeAgo = moment(time).fromNow();
        return timeAgo;
    }

    const handleNewThreadClick = () => {
        setShowNewThreadModal(true);
    }

    const handleCloseNewThreadModal = () => {
        setShowNewThreadModal(false);
    }

    const handleCreateNewThread = async (newThreadData) => {
        try {
            // Call an API or perform actions to create a new thread
            console.log('Creating new thread with data:', newThreadData);

            // Refetch threads or update state accordingly
            const updatedThreads = await VelocidaApi.getThreads(0);
            setThreads(updatedThreads);
        } catch (error) {
            console.error('Error creating new thread:', error);
        }

        // Close the modal after creating the thread
        handleCloseNewThreadModal();
    }

    const handlePageChange = (newPage) => {
        navigate(`/forum/${newPage}`);
    }

    if (!threadsLoaded) return <LoadingSpinner />;

    return (
        <div>
            <h1>Latest Active Threads on Velocida:</h1>
            <Button className="btn btn-custom mb-3" variant="primary" onClick={handleNewThreadClick}>
                New Thread
            </Button>

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
                            <td><a className="card-text" style={{ color: "#72A276" }} href={`/thread/${thread.id}`}>{thread.title}</a></td>
                            <td>{Object.keys(thread.posts).length}</td>
                            <td>{thread.author.user.username}</td>
                            <td>{convertToTimeSince(thread.updatedAt)}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="pagination-container">
                <div className="button-container">
                    <Button className="btn btn-custom" disabled={page_num <= 1} onClick={() => handlePageChange(parseInt(page_num, 20) - 1)}>
                        Previous
                    </Button>
                    <Button className="btn btn-custom" disabled={threads.length < 20} onClick={() => handlePageChange(parseInt(page_num, 20) + 1)}>
                        Next
                    </Button>
                </div>
                <div className="page-number"> Page Number {page_num} </div>
            </div>


            <NewThreadModal
                showToast={showToast}
                show={showNewThreadModal}
                handleClose={handleCloseNewThreadModal}
                handleCreateNewThread={handleCreateNewThread}
            />
        </div>
    );
};

export default Forum;
