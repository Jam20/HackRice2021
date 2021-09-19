import React, { useState, useEffect } from "react";
import { SideBarData, SideBarNav, message } from "./SideBarData";
import { useHistory } from "react-router-dom";
import "./components.css";
import MessageIcon from "@mui/icons-material/Message";
import MenuIcon from "@mui/icons-material/Menu";
import { Card } from "@material-ui/core";
import { Title } from "@mui/icons-material";
import { CardContent, CardHeader } from "@mui/material";
const SideMenu = () => {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(true);
  const pressSideBar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="sidebar">
      <a onClick={pressSideBar} className="menuButton">
        <MenuIcon
          style={{ alignContent: "flex-start" }}
          sx={{
            color: "white",
            width: 30,
            height: 30,
            marginLeft: 2,
            marginRight: 2,
          }}
        />
      </a>
      <div className={sidebar ? "left-section" : "sidebar-not-visible"}>
        <Card className="summaryPanel">
          <CardHeader title="Summary" />
          <CardContent>{message.summary}</CardContent>
        </Card>
        <Card className="timePanel">
          <CardHeader title="TimeStamps" />
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SideMenu;
