import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import VelocidaApi from "../VelocidaApi";
import LoadingSpinner from "./LoadingSpinner";
import { Card, Button, Table } from 'react-bootstrap';
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ActivityView.css';

const ActivityView = ({ showToast }) => {
    const [activity, setActivity] = useState(null);
    const { id } = useParams();
    const [activityLoaded, setActivityLoaded] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [currentUserLiked, setCurrentUserLiked] = useState(false);
    const [currentUserLikeId, setCurrentUserLikeId] = useState(null);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const result = await VelocidaApi.getActivity(id);
                    setActivity(result);

                    if (result.likes) {
                        const likesCount = result.likes.length;
                        setLikes(likesCount);
                    }

                    if (activity && currentUser && currentUser.profile.likes) {
                        const userLike = currentUser.profile.likes.find((like) => like.activityId === activity.id);

                        if (userLike) {
                            setCurrentUserLiked(true);
                            setCurrentUserLikeId(userLike.id);
                        } else {
                            setCurrentUserLiked(false);
                            setCurrentUserLikeId(null);
                        }
                    }

                    setActivityLoaded(true);
                }
            } catch (error) {
                console.error("Error in fetchData:", error);
                showToast("error", error.message || "An error occurred");
                setActivityLoaded(true);
            }
        };

        fetchData();
    }, [id, currentUser]);

    const handleCommentClick = () => {
        setShowCommentModal(true);
    };

    const handleCloseCommentModal = () => {
        setShowCommentModal(false);
    };

    const handleCommentSubmit = async (commentText) => {
        try {
            const commentData = {
                content: commentText,
                ownerId: currentUser.profile.id,
                activityId: activity.id
            };
            await VelocidaApi.createComment(commentData);
            showToast("success", "Comment successfully created.");
            setShowCommentModal(false);
            navigate(`/activity/${id}`);
            window.location.reload();
        } catch (error) {
            console.error("Error handling comment submission:", error);
        }
    };

    const handleLike = async () => {
        try {
            if (!currentUserLiked) {
                const likeData = {
                    activityId: activity.id,
                    ownerId: currentUser.profile.id,
                };
                console.log("Creating like...", likeData);
                const like = await VelocidaApi.createLike(likeData);
    
                if (like) {
                    console.log("Like created successfully:", like);
                    setLikes((prevLikes) => prevLikes + 1);
                    setCurrentUserLiked(true);
                    setCurrentUserLikeId(like.id);
                    showToast("success", "Activity successfully liked.");
                }
            } else {
                console.log("Deleting like...", currentUserLikeId);
                await VelocidaApi.deleteLike(currentUserLikeId);
    
                setLikes((prevLikes) => prevLikes - 1);
                setCurrentUserLiked(false);
                setCurrentUserLikeId(null);
                showToast("success", "Activity successfully unliked.");
            }
        } catch (error) {
            console.error("Error handling like:", error);
            showToast("error", error.message || "An error occurred");
        }
    };
    
    
    

    const formatActivityDuration = (duration) => {
        const fixNumber = (num) => Number(num.toPrecision(3));
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = fixNumber(Number(duration) - (((hours * 60) * 60) + (minutes * 60)));
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }

    if (!activityLoaded) return <LoadingSpinner />;

    return (
        <div className="mt-4">
            {activity ? (
                <>
                    <Card>
                        <div className="d-flex justify-content-end mt-2 mr-2">
                            {currentUser && (
                                <button onClick={handleLike} className={currentUserLiked ? 'Liked LikeBtn' : 'LikeBtn'}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </button>
                            )}
                        </div>
                        <Card.Body>
                            <Card.Title>{activity.title}</Card.Title>
                            <Card.Text>{activity.description}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>
                                <strong>Distance:</strong> {activity.distance} miles
                            </Card.Text>
                            <Card.Text>
                                <strong>Duration:</strong> {formatActivityDuration(activity.duration)}
                            </Card.Text>
                            {activity.likes && (
                                <Card.Text>
                                    <strong>Likes:</strong> {likes}
                                </Card.Text>
                            )}
                        </Card.Body>
                        <Card.Body>
                            <Button className="btn btn-custom" variant="primary" onClick={handleCommentClick}>
                                Comment
                            </Button>{" "}
                        </Card.Body>
                        {activity.comments && activity.comments.length > 0 ? (
                            <Card.Body>
                                <Card.Title>Comments:</Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activity.comments.map((comment, index) => (
                                            <tr key={comment?.id || index}>
                                                <td style={{ width: '20%' }}>{comment?.owner?.user?.username}</td>
                                                <td style={{ width: '80%' }}>{comment?.content}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        ) : (
                            <Card.Body>
                                <p>No current comments on this activity.</p>
                            </Card.Body>
                        )}
                    </Card>

                    <CommentModal
                        show={showCommentModal}
                        handleClose={handleCloseCommentModal}
                        handleCommentSubmit={handleCommentSubmit}
                    />
                </>
            ) : (
                <div className="text-center mt-5">
                    <p className="text-danger">Activity not found</p>
                </div>
            )}
        </div>
    );
};

export default ActivityView;
