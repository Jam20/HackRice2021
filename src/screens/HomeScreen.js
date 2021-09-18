import React, { useRef, useState } from 'react';
import './styles.css';
import cube from '../assets/cube.png'
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import TextLoop from "react-text-loop";
import { useHistory } from 'react-router-dom';

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
  "Maybe this will work..."
]
function HomeScreen(props) {
  const inputFile = useRef(null);
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const onChangeFile = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: 'POST',
      body: formData,
    };
    let response = await fetch('http://localhost:5000/upload_video', options);
    props.onChangeFile(response)
    setLoading(false)
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
      className="container">
      <img src={cube} style={{ position: 'absolute', zIndex: 1, width: '100vw', bottom: 0 }} />
      <p style={{ fontWeight: 'bold', fontSize: 100, marginVertical: 0, color: 'white', fontFamily: 'barlow', zIndex: 2 }}>Summarizer</p>
      <p style={{ color: 'white', fontFamily: 'barlow', zIndex: 2 }}>Give your ears a break</p>
      {loading ?
        <>
          <ScaleLoader color="#ffffff" loading={loading} css={override} size={25} style={{ zIndex: 5 }} />

          <p style={{ zIndex: 5, paddingTop: 8}}>
            <TextLoop delay={5000}>
              {phrases.map(phrase => <p style={{ color: 'white', fontFamily: 'barlow', zIndex: 2, fontSize: 20 }}>{phrase}</p>)}
            </TextLoop>
          </p>
        </> :
        <div style={{ backgroundColor: 'white', borderRadius: 10, width: 150, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 2 }}
          onClick={() => inputFile.current.click()}>
          <p style={{ color: '#3852BD', fontFamily: 'barlow', fontWeight: 'bold' }}>
            Upload
          </p>
        </div>
      }
      <input
        type='file'
        id='file'
        ref={inputFile}
        accept="video/*"
        style={{ display: 'none' }}
        onChange={onChangeFile} />

    </div>
  )
}

export default HomeScreen