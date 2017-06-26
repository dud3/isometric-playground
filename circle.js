function circle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 3;
}
circlem = circle.prototype;
circlem.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'orange';
    ctx.fill();
};
