function bed(x, y) {
	this.pos = new vector(x, y);
}
bed.prototype.draw = function() {
  var img = document.getElementById('fireplace');

  this.width = img.width;
  this.height = img.height;

  ctx.drawImage(img, this.pos.x, this.pos.y);

  // Debug
  ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
};
