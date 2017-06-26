// Base vectors of the screen:
// xScreen = [1]
//           [0]
//
// yScreen = [0]
//           [1]
//
// screenMatrix = [1 0]
//                [0 1]
//
// Two base vectors of isometric projection:
// xIso = [1  ]
//        [0.5]
//
// yIso = [-1 ]
//        [0.5]
//
// isoMatrix = [1   -1 ]
//             [0.5 0.5]
//
// We have to project between screen and isometric coordinates:
//
// E.x:
//  1. Find a point in screen projection:
//      2 * xScreen + 2 * yScreen = (2, 2)
//
//  2. Find a point in isometric projection(project from screen to isometric):
//      2 * xIso + 2 * yIso = (0, 1)
//
//  Meaninig that (2, 2) in screen coordinates would mean (0, 1) in isometric.
//
//  To make our life easier, we write the base vectors as tranransformation matrices,
//  and the points that we want to project from one projection to another as vectors:
//
//  Example 1. above becomes(screen coordinates):
//      screenMatrix * [2] = [2]
//                     [2]   [2]
//
//  Example 2. above becomes(screen to isometric):
//      isoMatrix * [2] = [0]
//                  [2]   [1]
//
//  Since we know how to project from screen->isometric, one thing left is to find the
//  projection from isometric->screen, which is the inverse.
//
//  We have the isoMatrix which projects scree->isometric, we need to find the inverse matrix.
//  Which is done like the following:
//      M = [ a b ]
//          [ c d ]
//
//      det = 1 / ad - bc
//      det * [ d -b]
//            [-c  a]
//

var projection = {
  xAxis: {x: 1, y: 0.5},
  yAxis: {x: -1, y: 0.5},
  origin: {x: 0, y: 0},
  project: function(x, y) {
    return {
      x: this.xAxis.x * x + this.yAxis.x * y,
      y: this.xAxis.y * x + this.yAxis.y * y
    }
  },
  getInverseMatrix: function() {
    // Inverse matrix
    //
    // M = [ a b ]
    //     [ c d ]
    //
    // 1 / ad - bc * [ d -b]
    //               [-c  a]
    //
    // Determinant

    var a = this.xAxis.x;
    var b = this.yAxis.x;
    var c = this.xAxis.y;
    var d = this.yAxis.y;

    var det = 1 / ((a * d) - (b * c));

    return {
      xAxis: {
        x: det * d,
        y: det * -(c)
      },
      yAxis: {
        x: det * -(b),
        y: det * a
      }
    };
  },
  global2iso: function(x, y) {
    var invM = this.getInverseMatrix();

    return {
      x: invM.xAxis.x * x + invM.yAxis.x * y,
      y: invM.xAxis.y * x + invM.yAxis.y * y
    }
  },
  setUpAxis: function() {
    // cludge factor dividing by two to
    // fit the display area
    ctx.setTransform(
      this.xAxis.x, this.xAxis.y,
      this.yAxis.x, this.yAxis.y,
      origin.x, origin.y
    );
  }
};
