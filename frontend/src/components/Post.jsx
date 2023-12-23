import React, { useState, useContext, useEffect } from 'react';
import VelocidaApi from '../VelocidaApi';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply } from '@fortawesome/free-solid-svg-icons';
import ReplyModal from './ReplyModal';
import UserContext from "../UserContext";

const Post = ({ post, showToast }) => {
  const { currentUser } = useContext(UserContext);
  const [voted, setVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [currentUserVote, setCurrentUserVote] = useState(null);

  useEffect(() => {
    // Set initial vote counts
    if (post.votes) {
      const upvotesCount = post.votes.filter((vote) => vote.upvote).length;
      const downvotesCount = post.votes.filter((vote) => !vote.upvote).length;
      setUpvotes(upvotesCount);
      setDownvotes(downvotesCount);
    }

    // Check for a vote from current user
    const userVote = post.votes.find((v) => v.authorId === currentUser.profile.id);
    setCurrentUserVote(userVote);
  }, [post.votes]);

  const handleVote = async (upvote) => {
    try {
      if (!currentUserVote) {
        const voteData = {
          postId: post.id,
          authorId: currentUser.profile.id,
          upvote: upvote,
        };
        const newVote = await VelocidaApi.createVote(voteData);
        setCurrentUserVote(newVote);
      } else {
        if (currentUserVote.upvote !== upvote) {
          const updatedVote = await VelocidaApi.toggleVote(currentUserVote.id);
          console.log('Updated vote after toggle:', updatedVote);
          setCurrentUserVote(updatedVote);
        } else {
          await VelocidaApi.removeVote(currentUserVote.id);
          setCurrentUserVote(null);
        }
      }
      const updatedPost = await VelocidaApi.getPost(post.id);
      const upvotesCount = updatedPost.votes.filter((vote) => vote.upvote).length;
      const downvotesCount = updatedPost.votes.filter((vote) => !vote.upvote).length;
      setUpvotes(upvotesCount);
      setDownvotes(downvotesCount);
    } catch (error) {
      console.error("Error handling vote:", error);
      showToast("error", error)
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={`Post ${voted ? 'Voted' : ''}`}>
      <div className="Sidebar">
        <div className="AuthorVoteBox">
          <div className="AuthorBox">
            <p>Author: {post.author.user.username} - {post.author.firstName} {post.author.lastName}</p>
          </div>
          <div className="VoteBox">
            <button onClick={() => handleVote(true)} className={currentUserVote && currentUserVote.upvote ? 'Voted' : ''}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button onClick={() => handleVote(false)} className={currentUserVote && !currentUserVote.upvote ? 'Voted' : ''}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
          <div className="VoteCountBox">
            <p>Upvotes: {upvotes}</p>
            <p>Downvotes: {downvotes}</p>
          </div>
          <div className="CreatedAtBox">
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="PostContent">
        <p>{post.content}</p>
      </div>
      <button className="ReplyButton" onClick={handleShowModal}>
        <FontAwesomeIcon icon={faReply} /> Reply
      </button>

      <ReplyModal
        show={showModal}
        handleClose={handleCloseModal}
        handleReplySubmit={(replyContent) => {
          console.log('Submitting reply:', replyContent);
          handleCloseModal();
        }}
      />
    </div>
  );
};

export default Post;
