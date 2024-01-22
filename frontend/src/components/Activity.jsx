import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const Activity = ({ activity }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{activity.title}</Card.Title>
        <Card.Text>{activity.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Duration: {activity.duration} hours</ListGroupItem>
        <ListGroupItem>Distance: {activity.distance} miles</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Title>Comments</Card.Title>
        <ul>
          {activity.comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </Card.Body>
      <Card.Body>
        <Card.Title>Likes</Card.Title>
        <ul>
          {activity.likes.map(like => (
            <li key={like.id}>{like.owner.name} liked this</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Activity;
