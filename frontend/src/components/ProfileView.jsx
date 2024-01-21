import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import VelocidaApi from "../VelocidaApi";
import LoadingSpinner from "./LoadingSpinner";
import './ProfileView.css';
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ showToast }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const { id } = useParams();
    const [profileLoaded, setProfileLoaded] = useState(false);
    const { currentUser } = useContext(UserContext);
    const [currentUserFollowing, setCurrentUserFollowing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                if (!currentUser || !currentUser.profile) {
                    showToast("error", "Please login or signup to view profiles.");
                    navigate("/");
                }

                const result = await VelocidaApi.getProfile(id);
                await setProfile(result);

                // Check if the current user is following the profile
                const currentFollowResult = currentUser.profile.following?.some((f) => f.followeeId === result.id) || false;
                setCurrentUserFollowing(currentFollowResult);
            } catch (error) {
                console.error("Error retrieving profile:", error);
            }

            setProfileLoaded(true);
        };

        // Make sure the id exists before attempting to fetch the profile
        if (id) {
            fetchData();
        }

        return () => setProfileLoaded(false);
    }, [id, currentUser?.profile?.following]);

    const handleFollowToggle = async () => {
        try {
            const followData = {
                followeeId: profile.id,
                followerId: currentUser.profile.id
            };
    
            if (currentUserFollowing) {
                await VelocidaApi.unfollowProfile(followData);
                showToast("success", "Successfully unfollowed.")
            } else {
                await VelocidaApi.followProfile(followData);
                showToast("success", "Successfully followed.")
            }
    
            // Refresh the profile data after follow/unfollow
            const updatedProfile = await VelocidaApi.getProfile(id);
            setProfile(updatedProfile);
    
            // Check if the current user is now following the profile
            const currentFollowResult = updatedProfile.followers?.some((f) => f.followerId === currentUser.profile.id) || false;
            setCurrentUserFollowing(currentFollowResult);
        } catch (error) {
            console.error("Error toggling follow:", error);
            showToast("error", error );
        }
    };
    

    if (!profileLoaded) return <LoadingSpinner />;

    return (
        <div className="ProfileContainer">
            {profile ? (
                <>
                    <div className="ProfileItem"><strong>Name: </strong>{profile.firstName} {profile.lastName}</div>
                    <div className="ProfileItem"><strong>Bio: </strong>{profile.bio}</div>
                    <div className="ProfileItem"><strong>Age: </strong>{profile.age}</div>
                    <div className="CountContainer">
                        <div className="CountItem"><strong>Following: </strong>{profile.following.length}</div>
                        <div className="CountItem"><strong>Followers: </strong>{profile.followers.length}</div>
                        <div className="CountItem"><strong>Posts: </strong>{profile.posts.length}</div>
                        <div className="CountItem"><strong>Activities: </strong>{profile.activities.length}</div>
                    </div>
                    <div className="follow-btn-div">
                        {currentUser.profile && id && currentUser.profile.id !== Number(id) && (
                            <button className="btn-custom" onClick={handleFollowToggle}>
                                {currentUserFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div>Profile not found</div>
            )}
        </div>
    );
};

export default ProfileView;
