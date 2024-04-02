import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; // Hook to get the current user
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
    const [user, loading, error] = useAuthState(auth); // Get the current user and auth loading state
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserInfo({ name: docSnap.data().name, email: docSnap.data().email });
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    setFetchError(error.message);
                }
            };

            fetchUserData();
        }
    }, [user]); // Dependency array to re-run the effect when the user changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || fetchError) {
        return <div>Error: {error?.message || fetchError}</div>;
    }

    if (!user) {
        return <div>Please login to see this page.</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Username (Email):</strong> {userInfo.email}</p>
        </div>
    );
};

export default Profile;
