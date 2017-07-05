// Events

c.addEventListener("mouseenter", function(e) {
  e.target.style.border = '1px solid orange';
});
c.addEventListener("mousemove", function(e) {

  clearCanvas(ctx);
  grid.draw();

  c.x = e.pageX - e.target.offsetLeft;
  c.y = e.pageY - e.target.offsetTop;

  var originX = c.x - map.padd;
  var originY = c.y - map.padd/2;

  var iso = projection.global2iso(originX, originY);

  var gridX = Math.floor(iso.x / map.tile.width);
  var gridY = Math.floor(iso.y / map.tile.height);
  var _tile = entities['tile_' + gridX + '_' + gridY];

  var snapX = Math.floor((iso.x + map.padd) / grid.width) * grid.width;
  var snapY = Math.floor((iso.y) / grid.height) * grid.height;

  console.log(snapX, snapY);

  var uniso = projection.project(snapX, snapY);

  aBed.pos.setPos(uniso.x, uniso.y);

  if(_tile !== undefined) {
    console.log(_tile);
  }

  aBed.draw();
});

c.mouseDown = false;
c.addEventListener("mouseout", function(e) {
  e.target.style.border = '1px solid black';
  c.mouseDown = false;
});
c.addEventListener("mousedown", function(e) {
  c.x = e.pageX - e.target.offsetLeft;
  c.y = e.pageY - e.target.offsetTop;
});
