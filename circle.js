function circle(x, y) {
   	this.pos = new vector(x, y);
    this.radius = 3;
}
circlem = circle.prototype;
circlem.draw = function() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'orange';
    ctx.fill();
};
