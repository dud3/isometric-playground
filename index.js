window.onload = function() {

var c = document.getElementById('c');
var ctx = c.getContext('2d');

function drawLine(ctx, x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.stroke();
}

function drawRect(ctx, x0, y0, x1, y1, color) {
  if(color === undefined) {
    color = 'grey';
  }
  ctx.beginPath();
  ctx.rect(x0, y0, x1, y1);
  ctx.fillStyle = color;
  ctx.fill();
}

function clearCanvas(ctx) {
  ctx.beginPath();
  ctx.rect(0, 0, c.width, c.height);
  ctx.fillStyle = "white";
  ctx.fill();
}

// the axis and origin
var xAxis  = {x : 1, y: 0.5};
var yAxis  = {x : -1, y: 0.5};
var origin = {x : 0, y : 0};

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

var padd = 400;
var map = {
  tile: {
    width: 10,
    height: 10
  },
  tiles: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  size: function() {
    return {
      width: this.tiles[0].length,
      height: this.tiles.length
    };
  }
};

function tile(x, y) {
  this.x = x;
  this.y = y;
  this.frame = 0;
}
tile.prototype.draw = function() {
  var img = document.getElementById('tileset');
  // Params:
  // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  ctx.drawImage(img, this.frame * 52, 0, 52, 32, this.x, this.y, 52, 32);

  // Debug
  ctx.strokeRect(this.x, this.y, 52, 32);
  // ctx.fillRect(this.x, this.y, 52, 32);
};

function bed(x, y) {
  this.x = x;
  this.y = y;
}
bed.prototype.draw = function() {
  var img = document.getElementById('bed');
  ctx.drawImage(img, this.x, this.y);
};

window.aBed = new bed(0, 0);
aBed.draw();

window.aTile = new tile(0, 0, 0);
aTile.draw();

function rect(x, y, color) {
  this.x = x;
  this.y = y;
  this.iso = projection.project(this.x - padd, this.y);
  this.width = map.tile.width;
  this.height = map.tile.height;
  this.tile = {
    x: (this.x - padd) / this.width,
    y: (this.y - padd) / this.height
  };
  this.color = color;
}
rect.prototype.draw = function() {
  drawRect(ctx, this.x, this.y,
           this.width, this.height, this.color)
};

// Draw everything

// Tiles
window.entities = {};
var obj = {};
var drawTiles = function() {
  for(var i = 0; i < map.size().width; i++) {
    for(var j = 0; j < map.size().height; j++) {

      var x = (i * map.tile.width) + padd;
      var y = (j * map.tile.height);

      var iso = projection.project(x, y);

      if(map.tiles[i][j] === 1) {
        obj = new gridCell(x, y);
      } else {
        // obj = new rect(x + padd, y, 'white');
      }

      entities['tile_' + i + '_' + j] = obj;
      obj.draw();
    }
  }
};

// Grid

var grid = {
  width: 10,
  height: 10
};
function gridCell(x, y) {
  this.x = x;
  this.y = y;
}
gridCellm = gridCell.prototype;
gridCellm.draw = function() {
  ctx.beginPath();

  var width = grid.width;

  var s = projection.project(this.x, this.y);
  ctx.moveTo(s.x, s.y);

  var sr = projection.project(this.x + width, this.y);
  ctx.lineTo(sr.x, sr.y); // line right

  var sd = projection.project(this.x + width, this.y + width);
  ctx.lineTo(sd.x, sd.y); // line down

  var sl = projection.project(this.x, this.y + width);
  ctx.lineTo(sl.x, sl.y); // line left

  ctx.lineTo(s.x, s.y);

  ctx.stroke();
};
var drawGrid = function() {
  for(var i = 0; i < map.size().width; i++) {
    for(var j = 0; j < map.size().height; j++) {

      var x = (i * grid.width) + padd;
      var y = (j * grid.height);

      var iso = projection.project(x, y);

      if(map.tiles[i][j] === 1) {
        obj = new gridCell(x, y);
      } else {
        // obj = new rect(x + padd, y, 'white');
      }

      entities['tile_' + i + '_' + j] = obj;
      obj.draw();
    }
  }
};
drawGrid();

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

var aCircle = new circle(10, 10);

// Events

c.addEventListener("mouseenter", function(e) {
  e.target.style.border = '1px solid orange';
});
c.addEventListener("mousemove", function(e) {
  c.x = e.pageX - e.target.offsetLeft;
  c.y = e.pageY - e.target.offsetTop;

  var originX = c.x - padd;
  var originY = c.y - padd/2;

  var iso = projection.global2iso(originX, originY);

  clearCanvas(ctx);
  drawGrid();

  var gridX = Math.floor(iso.x / map.tile.width);
  var gridY = Math.floor(iso.y / map.tile.height);
  var _tile = entities['tile_' + gridX + '_' + gridY];

  console.log(
    (Math.floor( (iso.x + padd) / grid.width ) * grid.width),
    (Math.floor( (iso.y) / grid.height ) * grid.height)
  );

  var uniso = projection.project(
    (Math.floor( (iso.x + padd) / grid.width ) * grid.width),
    (Math.floor( (iso.y) / grid.height ) * grid.height)
  );

  aTile.x = uniso.x;
  aTile.y = uniso.y;

  if(_tile !== undefined) {
    console.log(_tile);

    var uniso = projection.project(_tile.x + 5, _tile.y + 5);
    // console.log(uniso);

    // aCircle.x = uniso.x;
    // aCircle.y = uniso.y;

    // aCircle.draw();

    aTile.x = uniso.x;
    aTile.y = uniso.y;
  }

  aTile.draw();
});

c.mouseDown = false;
c.addEventListener("mouseout", function(e) {
  e.target.style.border = '1px solid black';
  c.mouseDown = false;
});
c.addEventListener("mousedown", function(e) {
  c.x = e.pageX - e.target.offsetLeft;
  c.y = e.pageY - e.target.offsetTop;

  c.mouseDown = true;

  var originX = c.x - padd;
  var originY = c.y - padd/2;

  var iso = projection.global2iso(originX, originY);

  console.log("");
  console.log("cart -> " + " x: " + originX + " y: " + originY);
  console.log("iso -> x: " + iso.x + " y: " + iso.y);

  var gridX = Math.floor(iso.x / map.tile.width);
  var gridY = Math.floor(iso.y / map.tile.height);
  var _tile = entities['tile_' + gridX + '_' + gridY];

  if(_tile !== undefined) {
    console.log(_tile);
    // var newTile = new tile(_tile.x + 50, _tile.y);
    // newTile.frame = Math.floor(Math.random() * 4) + 1;
    // newTile.draw();
  }
});

}

