import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav-bar">
      <div className="nav-bar-flex">
        <Link to="/home">
          <img
            className="logo"
            src="img/Logo.png"
            alt="Logo"
            width="150px"
            height="40px"
          />{" "}
        </Link>
        {/* <Link to="/home" className='title'> About </Link> */}
        <Link to="/info">
          <img
            className="info-logo"
            src="img/info.png"
            alt="About"
            width="35px"
            height="35px"
          />{" "}
        </Link>
        <img
          className="notifications-logo"
          src="img/notification.jpeg"
          alt="Notifications"
          width="30px"
          height="30px"
        />
        <img
          className="profile-logo"
          src="img/profile.jpeg"
          alt="profile"
          width="40px"
          height="40px"
        />
      </div>
    </div>
  );
};

export default Navigation;
