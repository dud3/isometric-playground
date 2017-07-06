var collider = {

	// e0 = emtity0 -> circle | rect
	// e1 = entity1 -> circle | rect
	collision: function(e0, e1) {
		var this_co = this;

		var c0 = e0 instanceof collider.circle;
		var r0 = e0 instanceof collider.rect;

		var c1 = e1 instanceof collider.circle;
		var r1 = e1 instanceof collider.rect;

		this.circleCollision = function(e0, e1) {
			var dist = util.math.distSq(e0.pos.x, e0.pos.y, e1.pos.x, e2.pos.x);
			var raddist = e0.radius + e1.radius;

			if(dist <= raddist) {
				return true;
			}

			return false;
		};

		this.rectCollision = function(e0, e1) {

			// If any of the edges of e1 is between the starting (top left)
			// and ending (bottom right) points of e0, then we have a collision

			var tl = e1.pos.topLeft.isBetween(e0.pos.topLeft, e0.pos.bottomRight);
			var tr = e1.pos.topRight.isBetween(e0.pos.topLeft, e0.pos.bottomRight);
			var bl = e1.pos.bottomLeft.isBetween(e0.pos.topLeft, e0.pos.bottomRight);
			var br = e1.pos.bottomRight.isBetween(e0.pos.topLeft, e0.pos.bottomRight);

			return tl || tr || bl || br;
		};

		this.polyCollision = function(e0, e1) {

		};

		this.check = function() {
			// circle and circle
			if(c0 && c1)
				return this_co.circleCollision(c0, c1);

			// rect and rect
			if(r0 && r1)
				return this_co.rectCollision(r0, r1);

			// circle and rect
			if(c0 && r1)
				return this_co.polyCollision(c0, r1);

			// rect and circle
			if(r0 && c1)
				return this_co.polyCollision(c1, r0);
		};
	},

	circle: function(x, y, r) {
		var thisc = this;

		this.pos = new vector(x, y);
		this.radius = r;

		this.setBounds = function(x, y, r) {
			thisc.pos.setPos(x, y);
			thisc.radius = r;
		};

		this.getBounds = function() {
			return { pos: thisc.pos, radius: thisc.radius };
		};

		this.collides = function(entity) {
			return collider.collision.check(thisc, entity);
		}
	},

	rect: function(x, y, x1, y1) {
		var thisr = this;

		this.pos = {
			topLeft: new vector(x, y),
			topRight: new vector(x1, y),
			bottomLeft: new vector(x, y1),
			bottomRight: new vector(x1, y1)
		};

		this.setBounds = function(x, y, x1, y1) {
			thisr.pos.topLeft.setPos(x, y);
			thisr.pos.topLeft.setPos(x1, y);
			thisr.pos.topLeft.setPos(x, y1);
			thisr.pos.topLeft.setPos(x1, y1);
		};

		this.getBounds = function() {
			return { pos: this.pos };
		};

		this.collides = function(entity) {
			return collider.collision.check(thisr, entity);
		};
	},

};
