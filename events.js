// Events

c.addEventListener("mouseenter", function(e) {
  e.target.style.border = '1px solid orange';
});
c.addEventListener("mousemove", function(e) {
  c.x = e.pageX - e.target.offsetLeft;
  c.y = e.pageY - e.target.offsetTop;

  var originX = c.x - padd;
  var originY = c.y - padd/2;

  var iso = projection.global2iso(originX, originY);

  clearCanvas(ctx);
  grid.draw();

  var gridX = Math.floor(iso.x / map.tile.width);
  var gridY = Math.floor(iso.y / map.tile.height);
  var _tile = entities['tile_' + gridX + '_' + gridY];

  console.log(
    (Math.floor( (iso.x + padd) / grid.width ) * grid.width),
    (Math.floor( (iso.y) / grid.height ) * grid.height)
  );

  var uniso = projection.project(
    (Math.floor( (iso.x + padd) / grid.width ) * grid.width),
    (Math.floor( (iso.y) / grid.height ) * grid.height)
  );

  aTile.x = uniso.x;
  aTile.y = uniso.y;

  if(_tile !== undefined) {
    console.log(_tile);

    var uniso = projection.project(_tile.x + 5, _tile.y + 5);
    // console.log(uniso);

    // aCircle.x = uniso.x;
    // aCircle.y = uniso.y;

    // aCircle.draw();

    aTile.x = uniso.x;
    aTile.y = uniso.y;
  }

  aTile.draw();
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
