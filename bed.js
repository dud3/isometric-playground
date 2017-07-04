function bed(x, y) {
  this.x = x;
  this.y = y;
}
bed.prototype.draw = function() {
  var img = document.getElementById('fireplace');

  this.width = img.width;
  this.height = img.height;

  ctx.drawImage(img, this.x, this.y);

  // Debug
  ctx.strokeRect(this.x, this.y, this.width, this.height);
};
