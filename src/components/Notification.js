const Notification = ({ notification }) => {
  const notificationStyles = {
    general: {
      backgroundColor: "lightgrey",
      padding: "10px",
      borderRadius: "10px",
      margin: "5px",
    },
    error: {
      color: "red",
      border: "2px solid red",
    },
    message: {
      color: "green",
      border: "2px solid green",
    },
    none: {
      display: "none",
    },
  };

  let notificationStyle = notification
    ? (notification.includes("Error:"))
      ? { ...notificationStyles.general, ...notificationStyles.error }
      : { ...notificationStyles.general, ...notificationStyles.message }
    : notificationStyles.none;

  return (
    <div className="notification-message" style={notificationStyle}>
      {notification}
    </div>
  );
};

export default Notification;
