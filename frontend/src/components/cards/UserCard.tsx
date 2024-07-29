import React from 'react';
import Image from 'next/image';

interface UserCardProps {
  user: {
    profilePicture: string;
    username: string;
    email: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="user-card">
    <Image src={user.profilePicture} alt={user.username} width={100} height={100} />
    <h3>{user.username}</h3>
    <p>{user.email}</p>
  </div>
);

export default UserCard;