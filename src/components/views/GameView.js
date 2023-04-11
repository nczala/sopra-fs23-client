import "styles/views/GameView.scss";
import logo from "pictionary_logo.png";
import trophy from "trophy.png";
import brush from "paintbrush.png";
import textbox from "textbox.png";
import CountDownTimer from "components/ui/CountDownTimer";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { draw } from "components/views/draw";
const colors = [
  "yellow",
  "green",
  "turquoise",
  "blue",
  "purple",
  "red",
  "brown",
  "gray",
  "black",
];

const GameView = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState(colors[8]);
  const [lineWidth, setLineWidth] = useState(5);

  const [isPainter, setIsPainter] = useState(true);

  function clearCanvas() {
    setColor(colors[8]);
    setLineWidth(5);
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <div className="game">
      <div className="game big-container">
        <div className="board container">
          <div className="board header-container">
            <div className="board header-container sub-container1">
              {isPainter ? (
                <PaintToolbar
                  selectedColor={color}
                  setColor={setColor}
                  lineWidth={lineWidth}
                  setLineWidth={setLineWidth}
                  clearCanvas={clearCanvas}
                ></PaintToolbar>
              ) : null}
            </div>
            <div className="board header-container sub-container2">
              Drawing Board
            </div>
            <div className="board header-container sub-container3">
              <div className="clock-container">
                <CountDownTimer clearCanvas={clearCanvas}></CountDownTimer>
              </div>
              <div className="rounds-container">Round 1/5</div>
            </div>
          </div>
          <Board
            color={color}
            lineWidth={lineWidth}
            ref={canvasRef}
            isPainter={isPainter}
          ></Board>
        </div>
      </div>

      <div className="game small-container">
        <div className="game small-container sub-container1">
          <img className="logo" src={logo}></img>
        </div>
        <div className="game small-container sub-container2">
          {isPainter ? (
            <WordToDrawBoard></WordToDrawBoard>
          ) : (
            <GuessingBoard></GuessingBoard>
          )}
        </div>
        <div className="game small-container sub-container3">
          <Ranking></Ranking>
        </div>
      </div>
    </div>
  );
};

export default GameView;

const Board = forwardRef(({ color, lineWidth, isPainter }, ref) => {
  useEffect(() => {
    const canvas = ref.current;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function handleMouseDown(event) {
      isDrawing = true;
      const bounds = canvas.getBoundingClientRect();

      lastX = event.clientX - bounds.left;
      lastY = event.clientY - bounds.top;
      console.log(lastX, lastY);
    }

    function handleMouseMove(event) {
      if (!isDrawing) return;
      const bounds = canvas.getBoundingClientRect();
      const currentX = event.clientX - bounds.left;
      const currentY = event.clientY - bounds.top;

      draw(ref, lastX, lastY, currentX, currentY, color, lineWidth);
      // console.log(lastX, lastY, currentX, currentY, color);

      lastX = currentX;
      lastY = currentY;
    }

    function handleMouseUp() {
      isDrawing = false;
    }

    function handleMouseOut() {
      isDrawing = false;
    }

    if (isPainter) {
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
  }, [color, lineWidth, isPainter, ref]);

  return (
    <canvas
      className="board canvas"
      width={1000}
      height={640}
      ref={ref}
    ></canvas>
  );
});

const PaintToolbar = (props) => {
  const { selectedColor, setColor, lineWidth, setLineWidth, clearCanvas } =
    props;

  const handleClearCanvas = () => {
    clearCanvas();
  };

  return (
    <div className="paint-toolbar">
      <div className="color-picker">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-picker-button ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{
              backgroundColor: color,
            }}
            onClick={() => setColor(color)}
          ></button>
        ))}
      </div>
      <div className="width-picker">
        <label>Line Width</label>
        <RangeSelection
          setter={setLineWidth}
          state={lineWidth}
          min={"1"}
          max={"29"}
          step={"2"}
        ></RangeSelection>
        <button className="clear-button" onClick={handleClearCanvas}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

const RangeSelection = ({ setter, state, min, max, step, disabled }) => {
  return (
    <input
      className="range-selection"
      type="range"
      min={min}
      max={max}
      value={state}
      step={step}
      disabled={disabled}
      onChange={(e) => setter(parseInt(e.target.value))}
    ></input>
  );
};

const WordToDrawBoard = () => {
  return (
    <div className="guessing-container">
      <h1>Word to paint</h1>
      <div className="guessing-container word">duck</div>
    </div>
  );
};

const GuessingBoard = () => {
  return (
    <div className="guessing-container">
      <h1>Type in your guess</h1>
      <div className="word-input-container">
        <input className="word-input"></input>
        <button className="word-input-button">Submit</button>
      </div>
    </div>
  );
};

const Ranking = () => {
  const players = [
    { name: "Player 1", score: 100, role: "guesser" },
    { name: "Player 2", score: 90, role: "guesser" },
    { name: "Player 3", score: 80, role: "painter" },
    { name: "Player 4", score: 70, role: "guesser" },
  ];

  return (
    <div className="ranking-container">
      <div className="ranking-header">
        <h1>Ranking</h1>
        <img src={trophy} className="ranking-header"></img>
      </div>
      <div className="ranking-table">
        {players.map((player, index) => (
          <div className="ranking-row" key={index}>
            <div className="ranking-element rank">#{index + 1}</div>
            <div className="ranking-element name">{player.name}</div>
            <div className="ranking-element role">
              {player.role === "painter" ? <img src={brush}></img> : null}
              {player.role === "guesser" ? <img src={textbox}></img> : null}
            </div>
            <div className="ranking-element points">{player.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
