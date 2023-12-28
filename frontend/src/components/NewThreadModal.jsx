import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import VelocidaApi from '../VelocidaApi';
import './ReplyModal.css';  // Import the styling
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

const NewThreadModal = ({ show, handleClose, handleCreateNewThread, showToast }) => {
  const [threadTitle, setThreadTitle] = useState('');
  const [threadContent, setThreadContent] = useState('');
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const createNewThread = async () => {
    try {
      const threadData = {
        title: threadTitle,
        content: threadContent,
        authorId: currentUser.profile.id,
      };
      const newThread = await VelocidaApi.createThread(threadData);

      const postData = {
        content: threadContent,
        authorId: currentUser.profile.id,
        threadId: newThread.id
      }
      const newPost = await VelocidaApi.createPost(postData);

      showToast("success", "Thread successfully created.");
      handleClose();
      navigate(`/thread/${newThread.id}`);
    } catch (error) {
      console.error('Error creating new thread:', error);
      showToast("error", { error });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Thread</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="m-2" controlId="newThreadTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter thread title"
              value={threadTitle}
              onChange={(e) => setThreadTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="m-2" controlId="newThreadContent">
            <Form.Label>Post Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={threadContent}
              onChange={(e) => setThreadContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="btn btn-custom btn-primary" variant="primary" onClick={createNewThread}>
          Create Thread
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewThreadModal;
