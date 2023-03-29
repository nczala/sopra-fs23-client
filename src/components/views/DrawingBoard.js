import React, { useEffect, useRef, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getDomain } from "helpers/getDomain";
import SockJsClient from "react-stomp";
import { drawLine } from "components/views/drawLine";

const colors = ["black", "brown", "red", "green", "yellow", "blue"];

const url = getDomain();

const DrawingBoard = () => {
  const clientRef = useRef(null);

  const canvasRef = useRef(null);
  const history = useHistory();
  const [color, setColor] = useState(colors[0]);
  //const [lobbyId, setLobbyId] = useState(null);
  const lobbyId = localStorage.getItem("lobbyId");

  const painterId = 1;
  const [isCurrentPainter, setIsCurrentPainter] = useState(false);

  useEffect(() => {
    if (currentUserIsPainter(painterId)) {
      setIsCurrentPainter(() => true);
    }
  });

  const currentUserIsPainter = (painterId) => {
    const currentUserId = parseInt(localStorage.getItem("id"));
    return painterId === currentUserId;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

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

      drawLine(canvasRef, lastX, lastY, currentX, currentY, color);
      sendDrawingMessage(lastX, lastY, currentX, currentY, color);
      lastX = currentX;
      lastY = currentY;
    }

    function handleMouseUp() {
      isDrawing = false;
    }

    function handleMouseOut() {
      isDrawing = false;
    }

    if (isCurrentPainter) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseout", handleMouseOut);
    }
    // clean-up - remove Eventlistener when page/component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseOut);
    };
  }, [color, isCurrentPainter]);

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  function handleClear(canvas) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  const sendDrawingMessage = (x1, y1, x2, y2, color) => {
    const requestBody = JSON.stringify({
      prevX: x1,
      prevY: y1,
      currX: x2,
      currY: y2,
      color: color,
    });
    console.log(requestBody);
    //clientRef.current.sendMessage("/app/drawing-all", requestBody);
    clientRef.current.sendMessage(`/app/drawing-all/${lobbyId}`, requestBody);
  };

  const sendClearMessage = () => {
    const requestBody = JSON.stringify({ task: "clear drawing board" });
    clientRef.current.sendMessage(`/app/drawing-clear/${lobbyId}`, requestBody);
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

  // ensures that clientRef set only when connecting, but not sure
  const handleClientRef = useCallback((client) => {
    console.log("setting client ref");
    clientRef.current = client;
  }, []);

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
        style={{
          //border: "2px solid black",
          backgroundColor: "white",
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
        }}
      />
      {isCurrentPainter && (
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
          <button
            style={{
              marginTop: "20px",
              //boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
            }}
            onClick={() => sendClearMessage()}
          >
            Clear
          </button>
          <button
            style={{
              //border: "2px solid black",
              //boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
            }}
            onClick={() => history.push("/game")}
          >
            Go Back
          </button>
        </div>
      )}
      <SockJsClient
        url={url + "/ws"}
        topics={[`/topic/drawing/${lobbyId}`, `/topic/clear/${lobbyId}`]}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg, topic) => {
          if (topic === `/topic/drawing/${lobbyId}`) {
            drawLine(
              canvasRef,
              msg.prevX,
              msg.prevY,
              msg.currX,
              msg.currY,
              msg.color
            );
            console.log("draw", msg);
          } else if (topic == `/topic/clear/${lobbyId}`) {
            handleClear(canvasRef.current);
          }
        }}
        ref={handleClientRef}
      />
    </div>
  );
};

export default DrawingBoard;
