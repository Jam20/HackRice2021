import React, { useState } from "react";
import "./screens.css";
import SideMenu from "../components/SideMenu";
import InfoContainer from "../components/InfoContainer";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const MainScreen = ({ data }) => {
  const history = useHistory();
  const BUTTON_HEIGHT = 37.5;
  /**prop analysis will give the current analysis to be displayed on the page. follows same format as python analysis object */

  return (
    <>
      <div className="top-bar">
        <text class="title-text" onClick={() => history.push("/home")}>
          Summarizer
        </text>
      </div>
      <div className="wrapper">
        <SideMenu summary={data.summary} />
        <div style={{marginTop: 16, display: 'flex', flexDirection: 'column'}}>
          <Button
            style={{
              borderColor:'white',  
              borderWidth: 2,
              borderStyle:'solid',
              padding: 16,
              width: 150,
              height: BUTTON_HEIGHT,
              marginLeft: "auto",
              marginRight: "3%",
              margin: 16
            }}
            onClick={() => history.push("/home")}
          >
            <text className={"button-text"}>Export</text>
          </Button>
          <Button
            style={{
              borderColor:'white',  
              borderWidth: 2,
              borderStyle:'solid',
              padding: 16,
              width: 150,
              height: BUTTON_HEIGHT,
              marginLeft: "auto",
              marginRight: "3%",
              margin: 16
            }}
            onClick={() => history.push("/home")}
          >
            <text className={"button-text"}>Search</text>
          </Button>
        </div>
        <InfoContainer message={data} />
      </div>
    </>
  );
};

export default MainScreen;
