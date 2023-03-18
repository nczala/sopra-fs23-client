import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDomain } from "helpers/getDomain";
import io from "socket.io-client";
import SockJsClient from "react-stomp";

const colors = ["black", "red", "green", "yellow", "blue"];

const url = getDomain();
//export const socket = io(url, { autoConnect: false });

const DrawingBoard = () => {
  //const clientRef = null;
  const clientRef = useRef(null);
  //const [clientRef, setClientRef] = useState(null);

  const canvasRef = useRef(null);
  const history = useHistory();
  const [color, setColor] = useState(colors[0]);
  //socket.connect();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineWidth = 5;
      context.strokeStyle = color;
      context.lineJoin = "round";
      context.closePath();
      context.stroke();

      //socket.emit(x1, y1, x2, y2, color);
    }

    function handleMouseDown(event) {
      isDrawing = true;
      const bounds = event.target.getBoundingClientRect();
      console.log(event);
      console.log(bounds.left, bounds.top);
      lastX = event.clientX - bounds.left;
      lastY = event.clientY - bounds.top;
    }

    function handleMouseMove(event) {
      if (!isDrawing) return;
      const bounds = event.target.getBoundingClientRect();
      const currentX = event.clientX - bounds.left;
      const currentY = event.clientY - bounds.top;

      drawLine(lastX, lastY, currentX, currentY);
      sendMessage(lastX, lastY, currentX, currentY, color);
      lastX = currentX;
      lastY = currentY;
    }

    function handleMouseUp() {
      isDrawing = false;
    }

    function handleMouseOut() {
      isDrawing = false;
    }

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseout", handleMouseOut);

    // clean-up - remove Eventlistener when page/component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseOut);
    };
  }, [color]);

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  function handleClear() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  const sendMessage = (x1, y1, x2, y2, color) => {
    const requestBody = JSON.stringify({
      prevX: x1,
      prevY: y1,
      currX: x2,
      currY: y2,
      color: color,
    });
    console.log(requestBody);
    clientRef.current.sendMessage("app/drawing-all", requestBody);
  };

  const download = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: "2px solid black", backgroundColor: "white" }}
      />
      <div>
        <label>
          Color:
          <select value={color} onChange={handleColorChange}>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleClear}>Clear</button>
        <button onClick={() => history.push("/game")}>Go Back</button>
      </div>
      <SockJsClient
        url={url + "/ws"}
        topics={["/topic/drawing"]}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg) => {
          console.log(msg);
        }}
        ref={(client) => {
          console.log("return");
          clientRef.current = client;
          //setClientRef(client);
        }}
      />
    </div>
  );
};

export default DrawingBoard;
