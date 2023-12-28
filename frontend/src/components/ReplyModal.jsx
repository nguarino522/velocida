import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import VelocidaApi from '../VelocidaApi';
import "./ReplyModal.css";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const ReplyModal = ({ show, handleClose, handleReplySubmit, threadId, parentPostId, showToast }) => {
  const [replyContent, setReplyContent] = useState('');
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitReply = async (e) => {
    try {
      const postData = {
        content: replyContent,
        authorId: currentUser.profile.id,
        threadId: threadId,
        parentPostId: parentPostId
      }
      const newPost = await VelocidaApi.createPost(postData);
      showToast("success", "Post successfully created.");
      handleClose();
      navigate(`/thread/${threadId}`);
      window.location.reload();
    } catch (errors) {
      showToast("error", { errors });
      handleClose();
      return;
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reply to Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="replyContent">
            <Form.Label>Your Reply:</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="btn btn-custom" variant="primary" onClick={submitReply}>
          Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReplyModal;
