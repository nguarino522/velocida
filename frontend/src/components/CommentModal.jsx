import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CommentModal = ({ show, handleClose, handleCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    handleCommentSubmit(commentText);
    setCommentText('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="commentText">
            <Form.Label>Your Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentText}
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="btn btn-custom" variant="primary" onClick={handleSubmit}>
          Submit Comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
