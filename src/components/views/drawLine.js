export const drawLine = (canvas, x1, y1, x2, y2, color) => {
  const context = canvas.current.getContext("2d");

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 5;
  context.strokeStyle = color;
  context.lineJoin = "round";
  context.closePath();
  context.stroke();
};
