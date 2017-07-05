function rect(x, y, color) {
  this.pos = new vector(x, y);
  this.iso = projection.project(this.pos.x - map.padd, this.pos.y);
  this.width = tile.width;
  this.height = tile.height;
  this.tile = {
    x: (this.pos.x - map.padd) / this.width,
    y: (this.pos.y - map.padd) / this.height
  };
  this.color = color;
}

rect.prototype.draw = function() {
  drawRect(ctx, this.pos.x, this.pos.y,
           this.width, this.height, this.color);
};
