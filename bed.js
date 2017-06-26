function bed(x, y) {
  this.x = x;
  this.y = y;
}
bed.prototype.draw = function() {
  var img = document.getElementById('bed');
  ctx.drawImage(img, this.x, this.y);
};
