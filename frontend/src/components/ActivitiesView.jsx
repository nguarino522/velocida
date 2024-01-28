import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VelocidaApi from '../VelocidaApi';
import LoadingSpinner from './LoadingSpinner';
import Activity from './Activity';
import UserContext from "../UserContext";

const ActivitiesView = () => {
    const [activities, setActivities] = useState([]);
    const [activitiesLoaded, setActivitiesLoaded] = useState(false);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        async function retrieveActivities() {
            try {
                setActivities(currentUser.profile.activities)
            } catch (error) {
                console.error("Error retrieving activities:", error);
            }
            setActivitiesLoaded(true);
        }

        retrieveActivities();
    }, []);

    if (!activitiesLoaded) return <LoadingSpinner />;

    return (
        <Container>
            <Row>
                {activities.map(activity => (
                    <Col key={activity.id} xs={12} md={6} lg={4} className="mb-4">
                        <Activity activity={activity} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ActivitiesView;
