import React from "react";

const SideBar = ({ dashboards }) => {
  const dashboard_array = [];
  dashboards.forEach((board) => {
    dashboard_array.push(
      <div className="sidebar-links" key={board}>
        <img
          src="img/icon.jpg"
          alt="Dashboard logo"
          width="25px"
          height="25px"
          className="board-logo"
        />
        <h2 className="board-header"> {board} </h2>
      </div>
    );
  });

  return (
    <div className="row">
      <div className="side-col">{dashboard_array}</div>
    </div>
  );
};

export default SideBar;
