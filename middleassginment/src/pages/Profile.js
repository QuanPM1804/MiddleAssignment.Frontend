import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../Service/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const userId = localStorage.getItem('userId');
        const response = await getProfile(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Display other user profile information */}
    </div>
  );
};

export default Profile;