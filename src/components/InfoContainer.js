import React from "react";
import "./components.css";

import { Button } from "@mui/material";
import { message } from "./SideBarData";
const InfoContainer = (props) => {
  const BUTTON_HEIGHT = 37.5;
  const analysis = message; //props.analysis;

  const getHighlightedText = (text, hightlight) => {
    // Split on highlight term and include term into parts, ignore case
    let regex = "(" + hightlight.join(`) | (`) + ")";
    const parts = text.split(new RegExp(regex, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              hightlight.indexOf(part) > -1
                ? { fontWeight: "bold", backgroundColor: "cyan" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };
  let textObjects = [];
  console.log(message.sentences instanceof Array);
  Array.prototype.forEach.call(message.sentences, (sentence) => {
    textObjects.push(
      <p>{getHighlightedText(sentence.text, analysis.key_phrases)} </p>
    );
  });

  return (
    <div className="info-container">
      <text
        style={{
          color: "black",
          fontSize: 18,
          marginTop: "2%",
        }}
      >
        {textObjects}
      </text>
    </div>
  );
};

export default InfoContainer;
