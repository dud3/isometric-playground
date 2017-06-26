// Grid

var grid = {
  width: 10,
  height: 10
};
function gridCell(x, y) {
  this.x = x;
  this.y = y;
}
gridCellm = gridCell.prototype;
gridCellm.draw = function() {
  ctx.beginPath();

  var width = grid.width;

  var s = projection.project(this.x, this.y);
  ctx.moveTo(s.x, s.y);

  var sr = projection.project(this.x + width, this.y);
  ctx.lineTo(sr.x, sr.y); // line right

  var sd = projection.project(this.x + width, this.y + width);
  ctx.lineTo(sd.x, sd.y); // line down

  var sl = projection.project(this.x, this.y + width);
  ctx.lineTo(sl.x, sl.y); // line left

  ctx.lineTo(s.x, s.y);

  ctx.stroke();
};
grid.draw = function() {
  for(var i = 0; i < map.size().width; i++) {
    for(var j = 0; j < map.size().height; j++) {

      var x = (i * grid.width) + padd;
      var y = (j * grid.height);

      var iso = projection.project(x, y);

      if(map.tiles[i][j] === 1) {
        obj = new gridCell(x, y);
      } else {
        // obj = new rect(x + padd, y, 'white');
      }

      entities['tile_' + i + '_' + j] = obj;
      obj.draw();
    }
  }
};
