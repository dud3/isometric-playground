// First two arguments are the starting poit x0, y0
// ... then x1, y1, x2, y2 ... xn, yn to x0, y0
//
// args -> [[x0, y0], [x1, y1] ... [xn, yn]] : pair of points
// enclose -> bool
function lines() {
	this.args = arguments;

	if(this.args.length < 2) {
		console.warn("At least 2 elements. args: " + this.args.length);
		return false;
	}

	var errorFlag = false;
	for(var i = 0; i < this.args.length; i++) {
		if(!(this.args[i] instanceof Array)) {
			errorFlag = true;
		}

		if(this.args[i] instanceof Array) {
			if(this.args[i].length % 2 == 1) {
				errorFlag = true;
			}
		}

		if(errorFlag) {
			console.warn("Your array should contain pair of elemtns");
			console.info(this.args[i] + " is invalid");
			break;
		}
	}
}
linesp = lines.prototype;

linesp.draw = function(enclose) {
	ctx.beginPath();

	ctx.moveTo(this.args[0][0], this.args[0][1]);

	for(var i = 1; i < this.args.length; i++) {
		ctx.lineTo(this.args[i][0], this.args[i][1]);
	}

	if(enclose) {
		ctx.lineTo(this.args[0][0], this.args[0][1]);
	}

	ctx.stroke();
}
