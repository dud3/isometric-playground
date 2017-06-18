function drawLine(ctx, x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.stroke();
}

function drawRect(ctx, x0, y0, x1, y1, color) {
  if(color === undefined) {
    color = 'grey';
  }
  ctx.beginPath();
  ctx.rect(x0, y0, x1, y1);
  ctx.fillStyle = color;
  ctx.fill();
}

function clearCanvas(ctx) {
  ctx.beginPath();
  ctx.rect(0, 0, c.width, c.height);
  ctx.fillStyle = "white";
  ctx.fill();
}
