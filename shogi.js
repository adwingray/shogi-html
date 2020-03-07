var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 640;
var pieces;
var faction;
var chosenPiece;
var availableMoves;
var images;
var board;
var BLOCK_WIDTH = CANVAS_WIDTH * 4 / 45;
var BLOCK_HEIGHT = BLOCK_WIDTH * 85 / 70;
var START_HEIGHT = CANVAS_HEIGHT / 2 - BLOCK_HEIGHT * 4.5;

function startGame() {

  faction = 0;
  chosenPiece = false;
  availableMoves = false;
  image_names = ["king", "rook", "promoted_rook", "bishop", "promoted_bishop", "goldgeneral", "silvergeneral", "promoted_silvergeneral", "knight", "promoted_knight", "lance", "promoted_lance", "pawn"];
  images = {};
  for (const name of image_names) {
    images[name] = new Image();
    images[name].src = "img/" + name + ".png";
    console.log(images[name]);
  }
  pieces = [{
    type : "king",
    pos : {x:4, y:8},
    belong : 0,
    upgraded : false
  },{
    type : "king",
    pos : {x:4, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "rook",
    pos : {x:7, y:7},
    belong : 0,
    upgraded : false
  }, {
    type : "rook",
    pos : {x:1, y:1},
    belong : 1,
    upgraded : false
  }, {
    type : "bishop",
    pos : {x:1, y:7},
    belong : 0,
    upgraded : false
  }, {
    type : "bishop",
    pos : {x:7, y:1},
    belong : 1,
    upgraded : false
  }, {
    type : "goldgeneral",
    pos : {x:3, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "goldgeneral",
    pos : {x:5, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "goldgeneral",
    pos : {x:5, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "goldgeneral",
    pos : {x:3, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "silvergeneral",
    pos : {x:2, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "silvergeneral",
    pos : {x:6, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "silvergeneral",
    pos : {x:6, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "silvergeneral",
    pos : {x:2, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "knight",
    pos : {x:1, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "knight",
    pos : {x:7, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "knight",
    pos : {x:7, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "knight",
    pos : {x:1, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "lance",
    pos : {x:0, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "lance",
    pos : {x:8, y:8},
    belong : 0,
    upgraded : false
  }, {
    type : "lance",
    pos : {x:8, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "lance",
    pos : {x:0, y:0},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:0, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:1, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:2, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:3, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:4, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:5, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:6, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:7, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:8, y:6},
    belong : 0,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:0, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:1, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:2, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:3, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:4, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:5, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:6, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:7, y:2},
    belong : 1,
    upgraded : false
  }, {
    type : "pawn",
    pos : {x:8, y:2},
    belong : 1,
    upgraded : false
  }];
  board = []
  for (var i = 0; i < 9; i++) {
    var column = []
    for (var j = 0; j < 9; j++) {
      column.push(0);
    }
    board.push(column);
  }
  for (const piece of pieces) {
    board[piece.pos.x][piece.pos.y] = piece;
  }
  myGameArea.start();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 200);
    window.addEventListener('mousedown', onMove);
    // window.addEventListener('mouseup', function (e) {
    //   myGameArea.x = false;
    //   myGameArea.y = false;
    // })
    window.addEventListener('touchstart', onMove);
    // window.addEventListener('touchend', function (e) {
    //   myGameArea.x = false;
    //   myGameArea.y = false;
    // })
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   this.context.fillStyle = "#99FF00";
  //   this.context.fillRect(0, START_HEIGHT, 9 * BLOCK_WIDTH, 9 * BLOCK_HEIGHT);
  }
}

function uploadBoard() {

}

function onMove(e) {
  tmpBlock = chooseBlockByCoordinates(e.pageX, e.pageY);
  var inAvailableMoves = false;
  if (chosenPiece) {
    if (availableMoves) {
      for (const move of availableMoves) {
        if (move[0] == tmpBlock[0] && move[1] == tmpBlock[1]) {
          console.log("in available moves")
          inAvailableMoves = true;
          if (tmpBlock[1] < 3) {
            chosenPiece.upgraded = true;
          }
          // eat rival's piece
          if (board[tmpBlock[0]][tmpBlock[1]]) {
            console.log("eat it");
            var piece = board[tmpBlock[0]][tmpBlock[1]];
            piece.belong = 3 - faction;
            if (piece.type == "pawn") {
              piece.pos.x = 0;
            } else if (piece.type == "lance") {
              piece.pos.x = 1;
            } else if (piece.type == "knight") {
              piece.pos.x = 2;
            } else if (piece.type == "silvergeneral") {
              piece.pos.x = 3;
            } else if (piece.type == "goldgeneral") {
              piece.pos.x = 4;
            } else if (piece.type == "bishop") {
              piece.pos.x = 5;
            } else if (piece.type == "rook") {
              piece.pos.x = 6;
            }
            piece.pos.y = 9;
            piece.upgraded = false;
          } else {

          }
          board[chosenPiece.pos.x][chosenPiece.pos.y] = 0;
          chosenPiece.pos.x = tmpBlock[0];
          chosenPiece.pos.y = tmpBlock[1];
          board[tmpBlock[0]][tmpBlock[1]] = chosenPiece;

          // if (chosenPiece.belong == 0) {
          //   for (const piece of pieces) {
          //     if (move[0] == piece.pos.x && move[1] == piece.pos.y) {
          //       piece.belong = 3 - faction;
          //       if (piece.type == "pawn") {
          //         piece.pos.x = 0;
          //       } else if (piece.type == "lance") {
          //         piece.pos.x = 1;
          //       } else if (piece.type == "knight") {
          //         piece.pos.x = 2;
          //       } else if (piece.type == "silvergeneral") {
          //         piece.pos.x = 3;
          //       } else if (piece.type == "goldgeneral") {
          //         piece.pos.x = 4;
          //       } else if (piece.type == "bishop") {
          //         piece.pos.x = 5;
          //       } else if (piece.type == "rook") {
          //         piece.pos.x = 6;
          //       }
          //       piece.pos.y = 9;
          //       piece.upgraded = false;
          //       break;
          //     }
          //   }
          //   board[chosenPiece.pos.x][chosenPiece.pos.y] = 0;
          // }



          chosenPiece = false;
          availableMoves = [];
          break;
        }
      }

    }
  }
  if (!inAvailableMoves) {
    chosenPiece = false;
    availableMoves = [];
    for (const piece of pieces) {
      if (piece.pos.x == tmpBlock[0] && piece.pos.y == tmpBlock[1] && piece.belong % 2 == 0) {
        chosenPiece = piece;
        updateAvailableMoves(piece);
        break;
      }
    }
  }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function chooseBlockByCoordinates(x, y) {
  var intX = Math.floor(x / BLOCK_WIDTH);
  var intY = Math.floor((y - START_HEIGHT) / BLOCK_HEIGHT);
  console.log([intX, intY]);
  return [intX, intY]
}

function updateAvailableMoves(piece) {
  availableMoves = [];
  if (piece.belong == 0) {
    if (piece.type == "king") {
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
          if (board[piece.pos.x + i][piece.pos.y + j] == undefined || ((board[piece.pos.x + i][piece.pos.y + j] != 0)  && board[piece.pos.x + i][piece.pos.y + j].belong == 0)) {
            continue;
          } else {
            availableMoves.push([piece.pos.x + i, piece.pos.y + j]);
          }
        }
      }
    } else if (piece.type == "rook") {
      for (var i = 1; i < 9; i++) {
        if (piece.pos.y - i < 0) {
          break;
        }
        if (board[piece.pos.x][piece.pos.y - i]) {
          if (board[piece.pos.x][piece.pos.y - i].belong == 1) {
            availableMoves.push([piece.pos.x, piece.pos.y - i]);
          }
          break;
        }
        availableMoves.push([piece.pos.x, piece.pos.y - i]);
      }
      for (var i = 1; i < 9; i++) {
        if (piece.pos.y + i > 8) {
          break;
        }
        if (board[piece.pos.x][piece.pos.y + i]) {
          if (board[piece.pos.x][piece.pos.y + i].belong == 1) {
            availableMoves.push([piece.pos.x, piece.pos.y + i]);
          }
          break;
        }
        availableMoves.push([piece.pos.x, piece.pos.y + i]);
      }
      for (var i = 1; i < 9; i++) {
        if (piece.pos.x - i < 0) {
          break;
        }
        if (board[piece.pos.x - i][piece.pos.y]) {
          if (board[piece.pos.x - i][piece.pos.y].belong == 1) {
            availableMoves.push([piece.pos.x - i, piece.pos.y]);
          }
          break;
        }
        availableMoves.push([piece.pos.x - i, piece.pos.y]);
      }
      for (var i = 1; i < 9; i++) {
        if (piece.pos.x + i > 8) {
          break;
        }
        if (board[piece.pos.x + i][piece.pos.y]) {
          if (board[piece.pos.x + i][piece.pos.y].belong == 1) {
            availableMoves.push([piece.pos.x + i, piece.pos.y]);
          }
          break;
        }
        availableMoves.push([piece.pos.x + i, piece.pos.y]);
      }
      if (piece.upgraded) {
        for (var i = -1; i < 2; i++) {
          for (var j = -1; j < 2; j++) {
            if (board[piece.pos.x + i][piece.pos.y + j] == undefined || ((board[piece.pos.x + i][piece.pos.y + j] != 0) && board[piece.pos.x + i][piece.pos.y + j].belong == 0)) {
              continue;
            } else {
              availableMoves.push([piece.pos.x + i, piece.pos.y + j]);
            }
          }
        }
      }
    } else if (piece.type == "bishop") {
      //console.log("0");
      for (var i = 1; i < 9; i++) {
        if (piece.pos.x - i < 0 || piece.pos.y - i < 0) {
          break;
        }
        if (board[piece.pos.x - i][piece.pos.y - i]) {
          if (board[piece.pos.x - i][piece.pos.y - i].belong == 1) {
            availableMoves.push([piece.pos.x - i, piece.pos.y - i]);
          }
          break;
        }
        availableMoves.push([piece.pos.x - i, piece.pos.y - i]);
      }
      //console.log(availableMoves);
      for (var i = 1; i < 9; i++) {
        if (piece.pos.x + i > 8 || piece.pos.y - i < 0) {
          //console.log("2");
          break;
        }
        if (board[piece.pos.x + i][piece.pos.y - i]) {
          //console.log(board[piece.pos.x + i][piece.pos.y - i]);
          if (board[piece.pos.x + i][piece.pos.y - i].belong == 1) {
            availableMoves.push([piece.pos.x + i, piece.pos.y - i]);
          }
          //console.log("3");
          break;
        }
        //console.log("1");
        availableMoves.push([piece.pos.x + i, piece.pos.y - i]);
      }
      //console.log(availableMoves);
      for (var i = 1; i < 9; i++) {
        if (piece.pos.x + i > 8 || piece.pos.y + i > 8) {
          break;
        }
        if (board[piece.pos.x + i][piece.pos.y + i]) {
          if (board[piece.pos.x + i][piece.pos.y + i].belong == 1) {
            availableMoves.push([piece.pos.x + i, piece.pos.y + i]);
          }
          break;
        }
        availableMoves.push([piece.pos.x + i, piece.pos.y + i]);
      }
      //console.log(availableMoves);
      for (var i = 1; i < 9; i++) {
        if (piece.pos.x - i < 0 || piece.pos.y + i > 8) {
          break;
        }
        if (board[piece.pos.x - i][piece.pos.y + i]) {
          if (board[piece.pos.x - i][piece.pos.y + i].belong == 1) {
            availableMoves.push([piece.pos.x - i, piece.pos.y + i]);
          }
          break;
        }
        availableMoves.push([piece.pos.x - i, piece.pos.y + i]);
      }
      //console.log(availableMoves);
      if (piece.upgraded) {
        for (var i = -1; i < 2; i++) {
          for (var j = -1; j < 2; j++) {
            if (board[piece.pos.x + i][piece.pos.y + j] == undefined || ((board[piece.pos.x + i][piece.pos.y + j] != 0)  && board[piece.pos.x + i][piece.pos.y + j].belong == 0)) {
              continue;
            } else {
              availableMoves.push([piece.pos.x + i, piece.pos.y + j]);
            }
          }
        }
      }
    } else if (piece.type == "silvergeneral" && piece.upgraded == false) {
      for (var i = -1; i < 2; i++) {
        if (board[piece.pos.x + i][piece.pos.y - 1] == undefined || ((board[piece.pos.x + i][piece.pos.y - 1] != 0)  && board[piece.pos.x + i][piece.pos.y - 1].belong == 0)) {
          continue;
        } else {
          availableMoves.push([piece.pos.x + i, piece.pos.y - 1]);
        }
      }
      if (!(board[piece.pos.x - 1][piece.pos.y + 1] == undefined || ((board[piece.pos.x - 1][piece.pos.y + 1] != 0)  && board[piece.pos.x - 1][piece.pos.y + 1].belong == 0))) {
        availableMoves.push([piece.pos.x - 1, piece.pos.y + 1]);
      }
      if (!(board[piece.pos.x + 1][piece.pos.y + 1] == undefined || ((board[piece.pos.x + 1][piece.pos.y + 1] != 0)  && board[piece.pos.x + 1][piece.pos.y + 1].belong == 0))) {
        availableMoves.push([piece.pos.x + 1, piece.pos.y + 1]);
      }
    } else if (piece.type == "knight" && piece.upgraded == false) {
      if (!(board[piece.pos.x - 1][piece.pos.y - 2] == undefined || ((board[piece.pos.x - 1][piece.pos.y - 2] != 0)  && board[piece.pos.x - 1][piece.pos.y - 2].belong == 0))) {
        availableMoves.push([piece.pos.x - 1, piece.pos.y - 2]);
      }
      if (!(board[piece.pos.x + 1][piece.pos.y - 2] == undefined || ((board[piece.pos.x + 1][piece.pos.y - 2] != 0)  && board[piece.pos.x + 1][piece.pos.y - 2].belong == 0))) {
        availableMoves.push([piece.pos.x + 1, piece.pos.y - 2]);
      }
    } else if (piece.type == "lance" && piece.upgraded == false) {
      for (var i = 1; i < 9; i++) {
        if (piece.pos.y - i < 0) {
          break;
        }
        if (board[piece.pos.x][piece.pos.y - i]) {
          if (board[piece.pos.x][piece.pos.y - i].belong == 1) {
            availableMoves.push([piece.pos.x, piece.pos.y - i]);
          }
          break;
        }
        availableMoves.push([piece.pos.x, piece.pos.y - i]);
      }
    } else if (piece.type == "pawn" && piece.upgraded == false) {
      if (!(board[piece.pos.x][piece.pos.y - 1] == undefined || ((board[piece.pos.x][piece.pos.y - 1] != 0)  && board[piece.pos.x][piece.pos.y - 1].belong == 0))) {
        availableMoves.push([piece.pos.x, piece.pos.y - 1]);
      }
    } else {
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 1; j++) {
          if (board[piece.pos.x + i][piece.pos.y + j] == undefined || ((board[piece.pos.x + i][piece.pos.y + j] != 0)  && board[piece.pos.x + i][piece.pos.y + j].belong == 0)) {
            continue;
          } else {
            availableMoves.push([piece.pos.x + i, piece.pos.y + j]);
          }
        }
      }
      if (!(board[piece.pos.x][piece.pos.y + 1] == undefined || ((board[piece.pos.x][piece.pos.y + 1] != 0)  && board[piece.pos.x][piece.pos.y + 1].belong == 0))) {
        availableMoves.push([piece.pos.x, piece.pos.y + 1]);
      }
    }
  } else if (piece.belong == 2) {

  }
  console.log(availableMoves);
}

function updateGameArea() {
  myGameArea.clear();
  ctx = myGameArea.context;
  for (const piece of pieces) {
    var name = "";
    if (piece.upgraded) {
      //ctx.drawImage(images["promoted_" + piece.type], piece.pos.x * BLOCK_WIDTH, piece.pos.y * BLOCK_HEIGHT + START_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
      name = "promoted_" + piece.type;
    } else {
      //ctx.drawImage(images[piece.type], piece.pos.x * BLOCK_WIDTH, piece.pos.y * BLOCK_HEIGHT + START_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
      name = piece.type;
      //ctx.drawImage(images[name], piece.pos.x * BLOCK_WIDTH, piece.pos.y * BLOCK_HEIGHT + START_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
      //console.log(images[piece.type]);
    }
    if (piece.belong % 2 == 0) {
      ctx.drawImage(images[name], piece.pos.x * BLOCK_WIDTH, piece.pos.y * BLOCK_HEIGHT + START_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
    } else {
      ctx.save();
      ctx.translate((1+piece.pos.x) * BLOCK_WIDTH, (1+piece.pos.y) * BLOCK_HEIGHT + START_HEIGHT);
      ctx.rotate(Math.PI);
      ctx.drawImage(images[name], 0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
      ctx.restore();
    }
  }
  ctx.fillStyle = "black";
  for (var i = 0; i < 9; i++) {
    ctx.fillRect(i * BLOCK_WIDTH - BLOCK_WIDTH / 14, START_HEIGHT - BLOCK_WIDTH / 14, BLOCK_WIDTH / 7, BLOCK_HEIGHT * 9);
    ctx.fillRect(0, START_HEIGHT + i * BLOCK_HEIGHT - BLOCK_WIDTH / 14, BLOCK_WIDTH * 9, BLOCK_WIDTH / 7);
  }
}


startGame()