import React from 'react';
import { Card, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Activity = ({ activity }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{activity.title}</Card.Title>
        <Card.Text>{activity.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <strong>Duration:</strong> {activity.duration} hours
        </ListGroupItem>
        <ListGroupItem>
          <strong>Distance:</strong> {activity.distance} miles
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        {activity.comments && activity.comments.length > 0 && (
          <>
            <Card.Title>Comments</Card.Title>
            <ul className="list-unstyled">
              {activity.comments.map(comment => (
                <li key={comment.id}>
                  <Badge bg="secondary" className="me-2">
                    {comment.owner.name}
                  </Badge>
                  {comment.content}
                </li>
              ))}
            </ul>
          </>
        )}
      </Card.Body>
      <Card.Body>
        {activity.likes && activity.likes.length > 0 && (
          <>
            <Card.Title>Likes</Card.Title>
            <ul className="list-unstyled">
              {activity.likes.map(like => (
                <li key={like.id}>
                  <Badge bg="info" className="me-2">
                    {like.owner.name}
                  </Badge>
                  liked this
                </li>
              ))}
            </ul>
          </>
        )}
      </Card.Body>
      <Card.Body>
        <Link to={`/activity/${activity.id}`}>
          <Button variant="primary" className="me-2 btn-custom">
            View Activity
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Activity;
