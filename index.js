window.onload = function() {

	window.aBed = new bed(0, 0);
	aBed.draw();

	window.aTile = new tile(0, 0, 0);
	aTile.draw();

	// Draw everything

	// map.drawTiles();

	grid.draw();

	var aCircle = new circle(10, 10);

}
