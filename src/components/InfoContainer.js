import { React, Component } from "react";
import "./components.css";
import { Button } from "@mui/material";
import { message } from "./SideBarData";
import { black } from "jest-matcher-utils/node_modules/chalk";

export class InfoContainerWraper extends Component {
  render() {
    return <InfoContainer />;
  }
}
const InfoContainer = (props) => {
  const BUTTON_HEIGHT = 37.5;
  const analysis = message; //props.analysis;

  const getHighlightedText = (text, keyPhrases, entities) => {
    // Split on highlight term and include term into parts, ignore case
    let regex = "(" + keyPhrases.join(`) | (`) + ")";
    let names = [];
    Array.prototype.forEach.call(entities, (entity) => {
      regex = regex + `| (${entity.name})`;
      names.push(entity.name);
    });
    console.log(regex);
    const parts = text.split(new RegExp(regex, "gi"));

    return (
      <span>
        {" "}
        {parts.map((part, i) => {
          let style = {};
          if (keyPhrases.indexOf(part) > -1) {
            style = {
              fontWeight: "bold",
              color: "#ff2020",
              textDecoration: "none",
            };
          }
          if (names.indexOf(part) > -1) {
            style = {
              fontWeight: "bold",
            };
            return (
              <span key={i} style={style}>
                <a
                  style={{
                    color: "blue",
                    textDecoration: "none",
                    fontStyle: "italic",
                  }}
                  href={entities[names.indexOf(part)].url}
                  target="_blank"
                >
                  {part + " "}
                </a>
              </span>
            );
          }
          if (part != undefined)
            return (
              <span key={i} style={style}>
                {part + " "}
              </span>
            );
        })}{" "}
      </span>
    );
  };
  let textObjects = [];
  console.log(message.sentences instanceof Array);
  Array.prototype.forEach.call(message.sentences, (sentence) => {
    textObjects.push(
      <p>
        {getHighlightedText(
          sentence.text,
          analysis.key_phrases,
          analysis.entities
        )}{" "}
      </p>
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
