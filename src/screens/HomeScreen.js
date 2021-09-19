import React, { useRef, useState } from "react";
import "./styles.css";
import cube from "../assets/cube.png";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import TextLoop from "react-text-loop";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { Button, DialogTitle } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
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
function HomeScreen(props) {
  //const inputFile = useRef(null);
  const [loading, setLoading] = useState(false); //Sets the page to initially not be loading
  const [open, setOpen] = useState(false);
  const history = useHistory();

  //Function which runs when the uploaded file changes
  const onChangeFile = async (e) => {
    if (e.length == 0) return;
    const file = e[0];
    console.log(file);
    setLoading(true);
    //format the file to the post request
    const formData = new FormData();
    formData.append("file", file);
    const options = {
      method: "POST",
      body: formData,
    };
    setOpen(false);
    //awaits a response from the python server
    let response = await fetch("http://localhost:5000/upload_video", options);
    //uses the prop function to send the response to the main page
    //props.onChangeFile(response);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Returns the generalized HTML output of the component
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow:'hidden'
      }}
      className="container"
    >
      <Dialog onClose={handleClose} open={open} maxWidth="lg" className='dialog-fade-in'
      >
        <div>
          <DialogTitle className="dialogTitle">UploadFile</DialogTitle>
          <DropzoneArea onChange={onChangeFile} 
          sx={{
            marginHorizontal:5
          }}/>
        </div>
      </Dialog>

      <img
        src={cube}
        style={{ 
          position: "absolute",
          zIndex: 1,
          width: "100vw",
          bottom: 0
         }}
         className={ 'img-pop-in' }
      />
      <div className="typewriter">
        <h1
          style={{
            fontWeight: 100,
            fontSize: 100,
            marginVertical: 0,
            color: "white",
            fontFamily: "barlow",
            zIndex: 2,
            letterSpacing:2
          }}
          className='fade-in'
        >
          Summarizer
        </h1>
      </div>
      <p style={{ 
        color: "white",
        fontFamily: "barlow",
        zIndex: 2
       }}
      className='fade-in'
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
            <TextLoop delay={5000}>
              {phrases.map((phrase) => (
                <p
                  style={{
                    color: "white",
                    fontFamily: "barlow",
                    zIndex: 2,
                    fontSize: 20,
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
          className='fade-in'
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
            className='btn'
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
    </div>
  );
}

export default HomeScreen;
