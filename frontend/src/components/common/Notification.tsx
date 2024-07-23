import React from 'react';

type NotificationProps = {
  type: string;
  message: string;
};

const Notification: React.FC<NotificationProps> = ({ type, message }) => (
  <div className={`notification notification-${type}`}>
    {message}
  </div>
);

export default Notification;
