import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDomain } from "helpers/getDomain";
import io from "socket.io-client";

const colors = ["black", "red", "green", "yellow", "blue"];

const Drawing = () => {
  const history = useHistory();
  const [color, setColor] = useState(colors[0]);
  const {canvasRef, } = useDraw(createLine);

  const createLine = ({ prevX, prevY, currX, currY, context } = {
    // socket.emit("drawLine", {prevX, prevY, currX, currY, color})
    drawline(prevX, prevY, currX, currY, color, context);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    
    socket.on("drawLine", ({prevX, prevY, currX, currY, color}) => {
        if (!context) return console.log('no ctx here')
        drawLine({ prevX, prevY, currX, currY, color})
      });

    return () => {
        socket.off("drawLine");
    };
  }, [canvasRef]);
};
