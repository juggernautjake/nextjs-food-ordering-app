import React from 'react';

interface UserCardProps {
  user: {
    profilePicture: string;
    username: string;
    email: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="user-card">
    <img src={user.profilePicture} alt={user.username} />
    <h3>{user.username}</h3>
    <p>{user.email}</p>
  </div>
);

export default UserCard;
