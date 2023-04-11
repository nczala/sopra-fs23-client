export const draw = (canvas, x1, y1, x2, y2, color, width) => {
  const context = canvas.current.getContext("2d");

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = width;
  context.strokeStyle = color;
  context.lineJoin = "round";
  context.closePath();
  context.stroke();
};
