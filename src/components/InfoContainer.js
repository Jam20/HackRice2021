import { React, Component } from "react";
import "./components.css";

class InfoContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <InfoContainerChild message={this.props.message}/>
    )
  }
}

const InfoContainerChild = ({ message }) => {
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
      <text style={{
        fontFamily: 'barlow',
        fontSize: 30,
      }}>Transcript</text>

      <text
        style={{
          color: "black",
          fontSize: 18,
        }}
      >
        {textObjects}
      </text>
    </div>
  );
};

export default InfoContainer;
