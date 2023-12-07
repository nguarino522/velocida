import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import VelocidaApi from "../VelocidaApi";
import LoadingSpinner from "./LoadingSpinner";

const ProfileView = () => {
    const [profile, setProfile] = useState(null);
    const { id } = useParams();
    const [profileLoaded, setProfileLoaded] = useState(false);

    useEffect(() => {
        async function retrieveProfile() {
            try {
                let result = await VelocidaApi.getProfile(id);
                setProfile(result);
            } catch (error) {
                console.error("Error retrieving profile:", error);
            }
            setProfileLoaded(true)
        }

        // Make sure the id exists before attempting to fetch the profile
        if (id) {
            retrieveProfile();
        }

        setProfileLoaded(false)
    }, [id]);

    if (!profileLoaded) return <LoadingSpinner />;

    return (
        <>
            <div>TEMP HOLDING ELEMENT</div>
            {profile ? (
                <>
                    <div>id: {profile.id}</div>
                    <div>bio: {profile.bio}</div>
                    <div>first name: {profile.firstName}</div>
                    <div>last name: {profile.lastName}</div>
                    <div>age: {profile.age}</div>
                </>
            ) : (
                <div>Profile not found</div>
            )}
        </>
    )
}

export default ProfileView