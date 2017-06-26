function rect(x, y, color) {
  this.x = x;
  this.y = y;
  this.iso = projection.project(this.x - map.padd, this.y);
  this.width = tile.width;
  this.height = tile.height;
  this.tile = {
    x: (this.x - map.padd) / this.width,
    y: (this.y - map.padd) / this.height
  };
  this.color = color;
}

rect.prototype.draw = function() {
  drawRect(ctx, this.x, this.y,
           this.width, this.height, this.color);
};
