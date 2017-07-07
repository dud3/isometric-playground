function vector(x, y) {
	this.x = x;
	this.y = y;
}

vector.prototype.scale = function(s) {
    return new vector(his.x * s, this.y * s);
};

vector.prototype.dot = function(v) {
    return (this.x * v.x + this.y * v.y);
};

vector.prototype.cross = function(v) {
    return (this.x * v.y - this.y * v.x);
};

vector.prototype.add = function(v) {
	return new vector(this.x + v.x, this.y + v.y);
};

vector.prototype.sub = function(v) {
	return new vector(this.x - v.x, this.y - v.y);
};

vector.prototype.mul = function(v) {
	return new vector(this.x * v.x, this.y * v.y);
};

vector.prototype.div = function(v) {
	return new vector(this.x / v.x, this.y / v.y);
};

vector.prototype.dist = function(v) {
	var diffx =	this.x - x;
	var diffY = this.y - y;

	return Math.sqrt((diffx * diffx) + (diffy * diffy));
};

// v0 -> starting vector
// v1 -> ending vector
vector.prototype.isBetween = function(v0, v1) {
	return (
		((this.x > v0.x) && (this.y > v0.y)) &&
		((this.x < v1.x) && (this.x < v1.y))
	);
};

vector.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
};

vector.prototype.getPos = function() {
	return {x: this.x, y: this.y};
};
