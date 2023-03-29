import "styles/views/GameView.scss";
import React, { useState, useEffect, useRef } from "react";

const GameView = () => {
  return (
    <body className="game">
      <div className="game big-container">
        <div className="board container">
          <div className="board header-container">
            <div className="board header-container sub-container1">
              <PaintToolbar></PaintToolbar>
            </div>
            <div className="board header-container sub-container2">
              Drawing Board
            </div>
            <div className="board header-container sub-container3"></div>
          </div>
          <Board></Board>
        </div>
      </div>

      <div className="game small-container">
        <div className="game small-container sub-container1"></div>
        <div className="game small-container sub-container2"></div>
        <div className="game small-container sub-container3"></div>
      </div>
    </body>
  );
};

export default GameView;

const Board = () => {
  return <canvas className="board canvas"></canvas>;
};

const PaintToolbar = (props) => {
  const { color, setColor, clearCanvas } = props;

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="paint-toolbar">
      <label htmlFor="color-picker"></label>
      <input
        type="color"
        id="color-picker"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};

const GuessingBoard = () => {};
