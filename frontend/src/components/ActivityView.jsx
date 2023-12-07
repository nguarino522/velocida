import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import VelocidaApi from "../VelocidaApi";
import LoadingSpinner from "./LoadingSpinner";

const ActivityView = () => {
    const [activity, setActivity] = useState(null);
    const { id } = useParams();
    const [activityLoaded, setActivityLoaded] = useState(false);

    useEffect(() => {
        async function retrieveActivity() {
            try {
                let result = await VelocidaApi.getActivity(id);
                setActivity(result);
                console.log(result);
            } catch (error) {
                console.error("Error retrieving activity:", error);
            }
            setActivityLoaded(true)
        }

        // Make sure the id exists before attempting to fetch the activity
        if (id) {
            retrieveActivity();
        }

        setActivityLoaded(false)
    }, [id]);

    if (!activityLoaded) return <LoadingSpinner />;

    return (
        <>
            <div>TEMP HOLDING ELEMENT</div>
            {activity ? (
                <>
                    <div>id: {activity.id}</div>
                    <div>title: {activity.title}</div>
                    <div>description: {activity.description}</div>
                    <div>distance: {activity.distance}</div>
                </>
            ) : (
                <div>Activity not found</div>
            )}
        </>
    )
}

export default ActivityView