import React, { useRef, useState } from "react";
import "./styles.css";
import "./clouds.css";
import cube from "../assets/cube.png";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import TextLoop from "react-text-loop";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { Button, DialogTitle } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import MainScreen from "./MainScreen";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 5;
`;
const phrases = [
  "Stuffing monkeys in barrels...",
  "Hunting for legendary relics...",
  "Making friends with the locals...",
  "Pressing the right buttons...",
  "Solving world peace...",
  "Maybe this will work...",
];
function HomeScreen() {
  //const inputFile = useRef(null);
  const [loading, setLoading] = useState(false); //Sets the page to initially not be loading
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [uri, setUri] = useState("");

  //Function which runs when the uploaded file changes
  const onChangeFile = async (e) => {
    if (e.length == 0) return;
    const file = e[0];
    setUri(file);
    setLoading(true);
    //format the file to the post request
    const formData = new FormData();
    formData.append("file", file);
    setOpen(false);
    //awaits a response from the python server
    try {
      let json = await axios.post(
        "https://584f-73-226-236-194.ngrok.io/upload_video",
        formData
      );
      setData(json.data.analysis);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Returns the generalized HTML output of the component
  const getHomeScreen = () => (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
      className="container"
    >
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth="lg"
        className="dialog-fade-in"
      >
        <div style={{ minWidth: "50vw" }}>
          <DialogTitle className="dialogTitle">Upload A File</DialogTitle>
          <DropzoneArea
            onChange={onChangeFile}
            filesLimit={1}
            maxFileSize={2000000000}
            dropzoneText={"Drop a video here"}
            acceptedFiles={["video/*"]}
            sx={{
              marginHorizontal: 5,
            }}
          />
        </div>
      </Dialog>

      <img
        src={cube}
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100vw",
          bottom: 0,
        }}
        className={"img-pop-in"}
      />
      <div className="typewriter" style={{ zIndex: 2, position: "relative" }}>
        <h1
          style={{
            fontWeight: 100,
            fontSize: 150,
            marginVertical: 0,
            color: "lightgray",
            fontFamily: "barlow",
            letterSpacing: 2,
          }}
          className="fade-in"
        >
          Sumo
        </h1>
      </div>
      <p
        style={{
          color: "lightgray",
          fontFamily: "barlow",
          zIndex: 2,
        }}
        className="fade-in"
      >
        Give your ears a break
      </p>
      {loading ? (
        <>
          <ScaleLoader
            color="#ffffff"
            loading={loading}
            css={override}
            size={25}
            style={{ zIndex: 5 }}
          />

          <p style={{ zIndex: 5, paddingTop: 8 }}>
            <TextLoop delay={10000}>
              {phrases.map((phrase) => (
                <p
                  style={{
                    color: "white",
                    fontFamily: "barlow",
                    zIndex: 2,
                    fontSize: 20,
                    animation: "none",
                    marginLeft: 0,
                  }}
                >
                  {phrase}
                </p>
              ))}
            </TextLoop>
          </p>
        </>
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
          className="fade-in"
        >
          <div
            style={{
              borderRadius: 10,
              width: 150,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 2,
            }}
            className="btn"
          >
            <p
              style={{
                fontFamily: "barlow",
                fontWeight: "bold",
              }}
            >
              Upload
            </p>
          </div>
        </Button>
      )}
      <div id="clouds">
        <div className="cloud cx1"></div>
        <div className="cloud cx2"></div>
        <div className="cloud cx3"></div>
        <div className="cloud cx4"></div>
        <div className="cloud cx5"></div>
      </div>
    </div>
  );
  return data ? <MainScreen data={data} uri={uri} /> : getHomeScreen();
}

export default HomeScreen;
