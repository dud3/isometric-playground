util.math = {
	square: (x) {
		return x * x;
	},

	distSq: function(x1, y1, x2, y2) {
    	return Math.sqrt(this.square(x2-x1) + this.square(y2-y1));
	},
};
