import React, { useState } from "react";
import "./screens.css";
import SideMenu from "../components/SideMenu";
import InfoContainer from "../components/InfoContainer";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const MainScreen = ({data}) => {
  const history = useHistory();
  const BUTTON_HEIGHT = 37.5;
  /**prop analysis will give the current analysis to be displayed on the page. follows same format as python analysis object */

  return (
    <>
      <div className="top-bar">
        <text class="title-text" onClick={() => history.push("/home")}>
          Summarizer
        </text>

        <Button
          sx={{
            background: "#1db954",
            padding: 1,
            paddingRight: 6,
            paddingLeft: 6,
            height: BUTTON_HEIGHT,
            marginLeft: "auto",
            marginRight: "3%",
            marginTop: "auto",
            marginBottom: "auto",
            "&:hover": {
              opacity: 0.7,
              background: "#1db954",
            },
          }}
          onClick={() => history.push("/home")}
        >
          <text className={"button-text"}>Export</text>
        </Button>
      </div>
      <div className="container">
        <div className="wrapper">
          <div>
            <SideMenu summary={data.summary}/>
          </div>
          <div className="middle-right-section">
            <InfoContainer message={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
