import React, { useRef, useState } from "react";
import "./screens.css";
import SideMenu from "../components/SideMenu";
import InfoContainer from "../components/InfoContainer";
import { Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useReactToPrint } from "react-to-print";
import ReactPlayer from "react-player";

const MainScreen = ({ data, uri }) => {
  const history = useHistory();
  const BUTTON_HEIGHT = 37.5;
  const componentRef = useRef();
  const videoRef = useRef();
  const handlePrint = useReactToPrint({ content: () => componentRef.current });
  const [query, setQuery] = useState("");

  const seekTrack = (number) => {
    videoRef.current.seekTo(number);
  };

  const findTime = () => {
    const q = query;
    for (const sentence of data.sentences) {
      if (sentence.text.includes(q)) {
        seekTrack(parseInt(sentence.startTime));
        break;
      }
    }
  };

  /**prop analysis will give the current analysis to be displayed on the page. follows same format as python analysis object */

  return (
    <>
      <div className="top-bar">
        <text class="title-text" onClick={() => history.push("/home")}>
          Sumo
        </text>
      </div>
      <div className="wrapper">
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            flex: 2,
          }}
        >
          <SideMenu summary={data.summary} />
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player fixed-bottom"
              url={URL.createObjectURL(uri)}
              width="100%"
              ref={videoRef}
              height="100%"
              controls={true}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            width: "94%",
          }}
        >
          <Button
            style={{
              borderColor: "white",
              borderWidth: 2,
              borderStyle: "solid",
              padding: 16,
              width: 150,
              height: BUTTON_HEIGHT,
              marginLeft: "auto",
              marginRight: "3%",
              margin: 16,
            }}
            onClick={handlePrint}
          >
            <text className={"button-text"}>Export</text>
          </Button>
          <TextField
            label="Query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            style={{ marginTop: 30, width: 150 }}
          />

          <Button
            style={{
              borderColor: "white",
              borderWidth: 2,
              borderStyle: "solid",
              padding: 16,
              width: 150,
              height: BUTTON_HEIGHT,
              marginLeft: "auto",
              marginRight: "3%",
              margin: 16,
            }}
            onClick={findTime}
          >
            <text className={"button-text"}>Search</text>
          </Button>
        </div>
        <InfoContainer message={data} ref={componentRef} />
      </div>
    </>
  );
};

export default MainScreen;
