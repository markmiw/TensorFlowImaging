import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./assets/styles.css";
import { drawRect } from "./Rect.jsx";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let [currentItem, setItem] = useState(null);
  const runCoco = async () => {
const net = await cocossd.load();

    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;


const obj = await net.detect(video);
setItem(obj);
// console.log(obj);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx );
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
            <div className='object-header'>
      {currentItem
      ? (currentItem.map(object => <h1 className='item'>{object.class + '   ' + object.score}</h1>))
      : null
    }
      </div>
      <div className="App-body">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </div>
    </div>
  );
}

export default App;