import React, { useRef, useState } from 'react';
import './styles.css';
import cube from '../assets/cube.png'

function Home() {
  const inputFile = useRef(null);
  const [file, setFile] = useState(null)
  const onChangeFile = (e) => {
    setFile(e.target.files[0])
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
      <img src={cube} style={{ position: 'absolute', zIndex: 1, height:'80%' }} />
      <p style={{ fontWeight: 'bold', fontSize: '8em', color: 'white', fontFamily: 'barlow', zIndex: 2 }}>Summarizer</p>
      <p style={{ color: 'white', fontFamily: 'barlow', zIndex: 2 }}>Give your ears a break</p>
      <div style={{ backgroundColor: 'white', borderRadius: 10, width: 150, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 2 }}
        onClick={() => inputFile.current.click()}>
        <p style={{ color: '#3852BD', fontFamily: 'barlow', fontWeight: 'bold' }}>
          Upload
        </p>
      </div>
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