import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReplyModal = ({ show, handleClose, handleReplySubmit }) => {
  const [replyContent, setReplyContent] = useState('');

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
              rows={3}
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
        <Button className="btn btn-custom btn-primary" variant="primary" onClick={() => handleReplySubmit(replyContent)}>
          Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReplyModal;
