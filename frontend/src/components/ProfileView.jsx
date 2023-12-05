import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import VelocidaApi from "../VelocidaApi";
import LoadingSpinner from "./LoadingSpinner";

const ProfileView = () => {
    const [profile, setProfile] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        async function retrieveProfile() {
            try {
                let result = await VelocidaApi.getProfile(id);
                setProfile(result);
                console.log(result)
            } catch (error) {
                console.error("Error retrieving profile:", error);
                // Optionally, set an error state or handle the error in another way
            }
        }

        // Make sure the id exists before attempting to fetch the profile
        if (id) {
            retrieveProfile();
        }
    }, [id]);

    if (!profile) return <LoadingSpinner />;

    return (
        <>
            <div>TEMP HOLDING ELEMENT</div>
            <div>id: {profile.id}</div>
            <div>bio: {profile.bio}</div>
            <div>first name: {profile.firstName}</div>
            <div>last name: {profile.lastName}</div>
            <div>age: {profile.age}</div>
        </>
    )
}

export default ProfileView