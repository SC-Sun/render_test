const Notification = ({ success, fail }) => {
  if (!success && !fail) {
    return null;
  }

  return (
    <div className={`${success ? "success" : "fail"}`}>
      {success ? success : fail}
    </div>
  );
};

export default Notification;
