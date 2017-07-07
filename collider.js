var collider = {

	// e0 = emtity0 -> circle | rect
	// e1 = entity1 -> circle | rect
	collision: {

		circleCollision: function(c0, c1) {
			var dist = util.math.distSq(c0.pos.x, c0.pos.y, c1.pos.x, c1.pos.x);
			var raddist = c0.radius + c1.radius;

			if(dist <= raddist) {
				return true;
			}

			return false;
		};

		rectCollision: function(c0, c1) {

			// If any of the edges of c1 is between the starting (top left)
			// and ending (bottom right) points of c0, then we have a collision

			var tl = c1.pos.topLeft.isBetween(c0.pos.topLeft, c0.pos.bottomRight);
			var tr = c1.pos.topRight.isBetween(c0.pos.topLeft, c0.pos.bottomRight);
			var bl = c1.pos.bottomLeft.isBetween(c0.pos.topLeft, c0.pos.bottomRight);
			var br = c1.pos.bottomRight.isBetween(c0.pos.topLeft, c0.pos.bottomRight);

			return tl || tr || bl || br;
		};

		circleRectCollision: function(c, r) {

			// Find the closest point to the circle within the rectangle
			var closestX = util.math.clamp(c.x, r.topLeft.x, r.topRight.x);
			var closestY = util.math.clamp(c.y, r.topLeft.y, r.bottomLeft.y);

			// Calculate the distance between the circle's center and this closest point
			var distanceX = c.x - closestX;
			var distanceY = c.y - closestY;

			// If the distance is less than the circle's radius, an intersection occurs
			var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

			return distanceSquared < (c.r * c.r);
		};

		check: function(e0, e1) {

			var c0 = e0 instanceof of collider.circle;
			var r0 = e0 instanceof of collider.rect;
			var c1 = e1 instanceof of collider.circle;
			var c1 = e1 instanceof of collider.rect;

			// circle and circle
			if(c0 && c1)
				return this.circleCollision(c0, c1);

			// rect and rect
			if(r0 && r1)
				return this.rectCollision(r0, r1);

			// circle and rect
			if(c0 && r1)
				return this.circleRectCollision(c0, r1);

			// rect and circle
			if(r0 && c1)
				return this.circleRectCollision(c1, r0);
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
