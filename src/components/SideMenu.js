import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./components.css";
import MessageIcon from "@mui/icons-material/Message";
import MenuIcon from "@mui/icons-material/Menu";
import { Card } from "@material-ui/core";
import { Title } from "@mui/icons-material";
import { CardContent, CardHeader } from "@mui/material";
const SideMenu = ({ summary }) => {
  return (
    <div className="info-container">
      <text style={{
        fontFamily:'barlow',
        fontSize: 30,
      }}>Summary</text>
      <text
        style={{
          color: "black",
          fontSize: 18,
          marginTop: "2%",
        }}
      >
        {summary}
      </text>
    </div>
  );
};

export default SideMenu;
