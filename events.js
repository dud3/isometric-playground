
c.addEventListener("mouseenter", function(e) {
  e.target.style.border = '1px solid orange';
});
c.addEventListener("mousemove", function(e) {
  c.x = event.pageX - event.target.offsetLeft;
  c.y = event.pageY - event.target.offsetTop;
});
c.addEventListener("mouseout", function(e) {
  e.target.style.border = '1px solid black';
});
c.addEventListener("mousedown", function(e) {
  c.x = e.pageX - e.target.offsetLeft;
  c.y = e.pageY - e.target.offsetTop;

  var originX = c.x - padd - 25;
  var originY = c.y - padd/2;

  var iso = projection.global2iso(originX, originY);

  console.log("");
  console.log("cart -> " + " x: " + originX + " y: " + originY);
  console.log("iso -> x: " + iso.x + " y: " + iso.y);

  var gridX = Math.floor(iso.x / tile.width);
  var gridY = Math.floor(iso.y / tile.height);
  var _tile = grid['tile_' + gridX + '_' + gridY];

  if(_tile !== undefined) {
    console.log(_tile);
    var newTile = new bed(_tile.x + 50, _tile.y);
    newTile.frame = Math.floor(Math.random() * 4) + 1;
    newTile.draw();
  }
});
