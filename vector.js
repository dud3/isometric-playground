function vector(x, y) {
	this._x = x;
	this._y = y;
}

vector.prototype.add = function(vec) {
	return new vector(this._x + vec.x, this._y + vec.y);
};

vector.prototype.sub = function(vec) {
	return new vector(this._x - vec.x, this._y - vec.y);
};

vector.prototype.mul = function(vec) {
	return new vector(this._x * vec.x, this._y * vec.y);
};

vector.prototype.div = function(vec) {
	return new vector(this._x / vec.x, this._y / vec.y);
};

vector.prototype.setPos = function(x, y) {
	this._x = x;
	this._y = y;
};

vector.prototype.getPos = function(vec) {
	return {x: this._x, y: this._y};
};

