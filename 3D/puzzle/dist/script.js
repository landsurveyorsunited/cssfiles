"use strict";

  let autoStart;
//-----------------------------------------------------------------------------
function isMiniature() {
return location.pathname.includes('/fullcpgrid/');
}

//-----------------------------------------------------------------------------
// Menu class
/*
Vertical single level menu
This menu will be put in a caller provided parent div. This div must have a CSS
position 'attribute' set to a value different from 'auto'

It is called with an object containing the following properties:

  parentDiv : name of a div, or the div itself
  idDivMenu : id which will be attributed to the menu div (child of parentDiv)
  title : text for title of menu. remains visible when menu closed
  lineOffset : vertical position of 1st line of menu
  lineStep : vertical distance between top of two menu lines
  lines : Array. Each element of this array is an object with two properties :
          - text : text line
          - func : "onclick" callback associated with line

*/

function Menu(params) {

  let parentDiv = params.parentDiv;
  if (typeof(parentDiv) == 'string') parentDiv = document.getElementById(parentDiv);
// div menu
  let divMenu=document.createElement('div');
  divMenu.setAttribute ("id",params.idDivMenu);
// title
  let dt = document.createElement('div');
  dt.classList.add('title');
  dt.appendChild(document.createTextNode(params.title));
  divMenu.appendChild(dt);

  for (let k = 0; k < params.lines.length; ++k){
    dt=document.createElement('div');
    dt.classList.add('line');
    dt.appendChild(document.createTextNode(params.lines[k].text));
    dt.style.top=(params.lineOffset + k * params.lineStep) + "px";
    dt.addEventListener("click",params.lines[k].func);
    divMenu.appendChild(dt);
  }
  divMenu.style.height = (params.lineOffset + params.lines.length * params.lineStep) +'px'
  parentDiv.appendChild(divMenu);
} // Menu

//-------------------------------------------------------------------------

// Point - - - - - - - - - - - - - - - - - - - -
function Point(x,y) {
  this.x = Number(x);
  this.y = Number(y);
} // Point

Point.prototype.copy = function() {
  return new Point(this.x,this.y);
}
// end Point - - - - - - - - - - - - - - - - - - - -

// Segment - - - - - - - - - - - - - - - - - - - -
// those segments are oriented

function Segment(p1,p2) {
  this.p1=new Point(p1.x,p1.y);
  this.p2=new Point(p2.x,p2.y);
}

Segment.prototype.length = function() {
  var dx=this.p1.x-this.p2.x;
  var dy=this.p1.y-this.p2.y;
  return Math.sqrt(dx*dx+dy*dy);
}
Segment.prototype.intersect = function(otherSegment) {
// take care of  paralel line segments if they are possible
  var x1=this.p1.x;
  var y1=this.p1.y;
  var x2=this.p2.x;
  var y2=this.p2.y;
  var x3=otherSegment.p1.x;
  var y3=otherSegment.p1.y;
  var x4=otherSegment.p2.x;
  var y4=otherSegment.p2.y;
  var discri=(y2-y1)*(x4-x3)-(x2-x1)*(y4-y3);
  var xs=x1*(y2-y1)*(x4-x3)-x3*(x2-x1)*(y4-y3)+(y3-y1)*(x2-x1)*(x4-x3);
  xs/=discri;

  var ys=y1*(x2-x1)*(y4-y3)-y3*(y2-y1)*(x4-x3)+(x3-x1)*(y2-y1)*(y4-y3);
  ys=-ys/discri;

  return new Point(xs,ys);
}
Segment.prototype.dx =function() {
  return this.p2.x-this.p1.x;
}
Segment.prototype.dy =function() {
  return this.p2.y-this.p1.y;
}

Segment.prototype.cross =function(otherSegment) {
  return (this.dx()*otherSegment.dy()-this.dy()*otherSegment.dx());
}
Segment.prototype.sin =function(otherSegment) {
// attention if length can be 0
// angle turning from this towards otherSegment
  return this.cross(otherSegment)/this.length()/otherSegment.length();
}

Segment.prototype.dot =function(otherSegment) {
  return (this.dx()*otherSegment.dx()+this.dy()*otherSegment.dy());
}

Segment.prototype.cos =function(otherSegment) {
// attention if length can be 0
// angle turning from this towards otherSegment
  return this.dot(otherSegment)/this.length()/otherSegment.length();
}

// returns a point at a given distance of p1, positive direction beeing towards p2
Segment.prototype.pointOnAbsolute = function (abscisse) {
// attention if segment length can be 0
  var dx= this.p2.x-this.p1.x;
  var dy= this.p2.y-this.p1.y;
  var lng=Math.sqrt(dx*dx+dy*dy);
  return new Point(this.p1.x+abscisse*dx/lng, this.p1.y+abscisse*dy/lng);
}

Segment.prototype.pointOnRelative = function (coeff) {
// attention if segment length can be 0
  var dx= this.p2.x-this.p1.x;
  var dy= this.p2.y-this.p1.y;
  return new Point(this.p1.x+coeff*dx, this.p1.y+coeff*dy);
}

// returns a segment with origin p1, perpendicular to p1p2
Segment.prototype.perpendicularOrigin = function (positive) {
  var dx= this.p2.x-this.p1.x;
  var dy= this.p2.y-this.p1.y;
  if (positive) return new Segment(this.p1,new Point(this.p1.x-dy,this.p1.y+dx));
  return new Segment(this.p1,new Point(this.p1.x+dy,this.p1.y-dx));
}
// returns a segment with origin p2, perpendicular to p1p2
Segment.prototype.perpendicularEnd = function (positive) {
  var dx= this.p2.x-this.p1.x;
  var dy= this.p2.y-this.p1.y;
  if (positive) return new Segment(this.p2,new Point(this.p2.x-dy,this.p2.y+dx));
  return new Segment(this.p2,new Point(this.p2.x+dy,this.p2.y-dx));
}

// end Segment
//-------------------------------------------------------------------------
let uploadFile;
{ // scope for uploadFile

  let options, callBack;

  let elFile = document.createElement('input');
  elFile.setAttribute('type', 'file');
  elFile.style.display = 'none';
  elFile.addEventListener("change", getFile);

  function getFile() {

    if (this.files.length == 0) {
      returnLoadFile ({fail: 'no file'});
      return;
    }
    let file = this.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      if (options.image) options.image.src = reader.result;
      returnLoadFile ({success: reader.result, file: file});
    });
    reader.addEventListener('abort', () => {
      returnLoadFile ({fail: 'abort'});
    });
    reader.addEventListener('error', () => {
      returnLoadFile ({fail: 'error'});
    });

    if (options.image || options.readMethod == 'readAsDataURL')
      reader.readAsDataURL(this.files[0]);
    else
      reader.readAsText(this.files[0]);

  } // getFile

  function returnLoadFile(returnedValue) {
    callBack(returnedValue);
  }

uploadFile = function(ocallBack, ooptions) {
/* loads a file asynchronously
at the end of the process, calls the function 'callBack' with an object :

{fail: string} in case of failure, where string gives the reason of the failure
or
{success : string, file: file} where string is the content of the image file
   file represents the loaded file, and may be tested for file.type, file.name...

CAUTION ! If the user clicks 'cancel' when loading a file, nothing happens.

options is an object, with 0, one or more of the following properties :
accept : string to pass as "accept" attribute to the load file button, such as '.txt' or 'image/*'
            default : no value (will accept  * . * )
readMethod : 'readAsText' or 'readAsDataURL' - default is readAsText
image: if provided, must be an Image element. If possible, the data is loaded
with readAsDataURL, no matter the value of readMethod, and option.image.src is set to the data.
The function then returns normally as defined above.
Normally, a 'load' event should be triggered on the image.
*/

  options = ooptions;
  callBack = ocallBack;
  if (options.accept) elFile.setAttribute("accept", options.accept);
  else elFile.removeAttribute("accept");
  elFile.click();

} // uploadFile
} //  // scope for uploadFile

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// side of a piece

function Side() {
  this.type = ""; // "d" pour straight line or "z" pour classic
  this.points = []; // real points or Bezier curve points
} // Side

/*
draws the path corresponding to a side
Parameters :
  ctx : canvas context
  shiftx, shifty : position shift used to create shadow effect
  backwards : boolean, must be true for bottom and left sides, which must be drawn
      from the last point to the first
  withoutMoveTo : to decide whether to do a moveTo to the first point. Without MoveTo
  must be done only for the first side of a piece, not for the following ones
*/

Side.prototype.drawPath = function(ctx, shiftx, shifty, backwards, withoutMoveTo) {

  let k, mix, miy;

  if (backwards) {
    if (!withoutMoveTo) {
      ctx.moveTo(this.points[this.points.length - 1].x - shiftx, this.points[this.points.length - 1].y - shifty);
    }
    if(this.type == "d") {
      ctx.lineTo(this.points[0].x - shiftx, this.points[0].y - shifty);
    } else { // jigsaw side
      for (k = this.points.length - 2 ; k>0; k--) {
        if (k >1) {
          mix = (this.points[k].x + this.points[k - 1].x) / 2 - shiftx;
          miy = (this.points[k].y + this.points[k - 1].y) / 2 - shifty;
          ctx.quadraticCurveTo(this.points[k].x - shiftx, this.points[k].y - shifty, mix, miy);
        } else {
          ctx.quadraticCurveTo(this.points[k].x - shiftx, this.points[k].y - shifty, this.points[k - 1].x - shiftx, this.points[k - 1].y - shifty);
        }
      } // for k
    } // if jigsaw side
  } else {
    if (!withoutMoveTo) {
      ctx.moveTo(this.points[0].x - shiftx, this.points[0].y - shifty);
    }
    if(this.type == "d") {
      ctx.lineTo(this.points[1].x - shiftx, this.points[1].y - shifty);
    } else { // edge zigzag
      for (k = 1 ; k < this.points.length - 1; k++) {
        if (k < this.points.length - 2) {
          mix = (this.points[k].x + this.points[k + 1].x) / 2 - shiftx;
          miy = (this.points[k].y + this.points[k + 1].y) / 2 - shifty;
          ctx.quadraticCurveTo(this.points[k].x - shiftx, this.points[k].y - shifty, mix, miy);
        } else {
          ctx.quadraticCurveTo(this.points[k].x - shiftx, this.points[k].y - shifty, this.points[k + 1].x - shiftx, this.points[k + 1].y - shifty);
        }
      } // for k
    } // if jigsaw side
  }
} // Side.prototype.drawPath

// fin Side
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

function Piece(kx, ky) { // object with 4 sides
  this.ts = new Side(); // top side
  this.rs = new Side(); // right side
  this.bs = new Side(); // bottom side
  this.ls = new Side(); // left side
  this.kx = kx;
  this.ky = ky;
}

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
/* draw path for one piece
  shiftx and shifty used for shadow effect
  does from beginPath to closePath, but not actually draw : no stroke nor fill nor clip here
*/

Piece.prototype.drawPath = function (ctx, shiftx, shifty, withoutBeginPath) {

  if (withoutBeginPath !== true) ctx.beginPath();

  this.ts.drawPath(ctx, shiftx, shifty, false, false); // top side
  this.rs.drawPath(ctx, shiftx, shifty, false, true);  // right side
  this.bs.drawPath(ctx, shiftx, shifty, true, true);   // bottom side
  this.ls.drawPath(ctx, shiftx, shifty, true, true);   // left

} //

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
/*
creates and returns a div for an individual piece, with a canvas with shadow, and a part of the picture
canvas and div are three times the average size of pieces
puzzle object given in parameters provides required elements
scale and x and y offsets allow to scale and truncate picture to actual size
*/
// crée et rend un div pour pièce individuelle, avec un canvas avec ombre et extrait de l'image
// le canvas et le div font trois fois la width et la height moyennes des pièces
// l'objet puzzle donné en entrée donne les éléments nécessaires
// l'échelle et les offsets x et y permettent de mettre à l'échelle et tronquer l'image réelle pour l'adapter au plateau

Piece.prototype.createDivPiece = function(puzzle, scale, offsx, offsy) {

  let ctx, shiftx, shifty;
  this.theDiv = document.createElement('div');
  this.theDiv.style.width = 3 * puzzle.dx + "px";
  this.theDiv.style.height = 3 * puzzle.dy + "px";
  this.theDiv.style.position = "absolute";

  this.theCanv = document.createElement('canvas');
  this.theCanv.width = 3 * puzzle.dx;
  this.theCanv.height = 3 * puzzle.dy;

// origine shifting for path drawing
  shiftx = puzzle.dx * (this.kx - 1);
  shifty = puzzle.dy * (this.ky - 1);

  ctx = this.ctx = this.theCanv.getContext("2d");
  this.drawPath(ctx, shiftx, shifty);

  ctx.clip();

  ctx.drawImage(puzzle.image, (this.kx - 1) * puzzle.dx / scale + offsx,
                             (this.ky - 1 ) * puzzle.dy / scale + offsy,
                             3 * puzzle.dx / scale, 3 * puzzle.dy / scale,
                             0, 0,
                             3 * puzzle.dx, 3 * puzzle.dy);
// shadow effect
// depends on size of pieces

  let shift = 1, thickness = 2;
   if (puzzle.dx > 100 && puzzle.dy > 100) {
    shift = 2; thickness = 5;
  } else if (puzzle.dx > 50 && puzzle.dy > 50) {
    shift = 1.5; thickness = 3;
  }

  this.drawPath(ctx, shiftx + shift, shifty + shift);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
  ctx.stroke();
  this.drawPath(ctx, shiftx - shift, shifty - shift);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.stroke();
  this.drawPath(ctx, shiftx, shifty); // path used for selection of the piece

/* place of the piece at the beginning of the game */
  this.moveTo(new Point((this.kx - 1) * puzzle.dx + Puzzle.MARGIN1,
                        (this.ky - 1) * puzzle.dy + Puzzle.MARGIN1));

  this.theDiv.appendChild(this.theCanv);

  return this.theDiv;
} // createDivPiece
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

// returns position of current piece

Piece.prototype.where = function() {
  let x, y;
  x = parseFloat(this.theDiv.style.left);
  y = parseFloat(this.theDiv.style.top);
  return new Point(x, y);
} // Piece.prototype.where

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
/* move piece to a given location
onePoint if location of top lefthand corner of div (far beyond visible par of piece)
*/
Piece.prototype.moveTo = function(onePoint) {
  this.theDiv.style.top = onePoint.y + "px";
  this.theDiv.style.left = onePoint.x + "px";
} // Piece.prototype.moveTo

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// true if given (mouse) coordoninates are inside the piece

Piece.prototype.insidePiece = function(x, y) {

  let styl = getComputedStyle(this.theDiv);
  let xloc = x - parseFloat(styl.left); // 'local' x and y
  let yloc = y - parseFloat(styl.top);

  return this.ctx.isPointInPath(xloc, yloc);

} // Piece.prototype.insidePiece

// fin Piece


//--------------------------------------------------------------
//--------------------------------------------------------------
// class PolyPiece
// represents a group de pieces well positionned with respect  to each other.
// pckxmin, pckxmax, pckymin and pckymax record each a piece with highest kx, lowest kx...


function PolyPiece(initialPiece, z, puzz) {
  initialPiece.theDiv.style.zIndex = z;
  this.pckxmin  =
  this.pckxmax  =
  this.pckymin  =
  this.pckymax = initialPiece;
  this.pieces = [initialPiece];
  this.puzzle = puzz;
} // PolyPiece

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
/*
  this method
    - adds pieces of otherPoly to this PolyPiece
    - adjusts coordinates of new pieces to make the consistent with this polyPiece
    - does not re - evaluate the z - index of the polyPieces
*/

PolyPiece.prototype.merge = function(otherPoly) {

  for (let k = 0; k < otherPoly.pieces.length; ++k) {
    this.pieces.push(otherPoly.pieces[k]);
    // watch leftmost, topmost... pieces
    if (otherPoly.pieces[k].kx < this.pckxmin.kx) this.pckxmin = otherPoly.pieces[k];
    if (otherPoly.pieces[k].kx > this.pckxmax.kx) this.pckxmax = otherPoly.pieces[k];
    if (otherPoly.pieces[k].ky < this.pckymin.ky) this.pckymin = otherPoly.pieces[k];
    if (otherPoly.pieces[k].ky > this.pckymax.ky) this.pckymax = otherPoly.pieces[k];
  } // for k

  this.moveTo(this.where()); // to set positions of new pieces

// sort the pièces by increasing kx, ky

  this.pieces.sort(function(p1, p2){
       if (p1.ky < p2.ky) return  - 1;
       if (p1.ky > p2.ky) return 1;
       if (p1.kx < p2.kx) return  - 1;
       if (p1.kx > p2.kx) return 1;
       return 0; // should not occur
       });

} // merge

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
PolyPiece.prototype.where = function() {
  return this.pieces[0].where();
} // PolyPiece.prototype.where

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// the position of the PolyPiece is this of its 1st piece
// the position of the others is evaluated on this basis

PolyPiece.prototype.moveTo = function(pnt) {

  this.pieces[0].moveTo(pnt);
  for (let kp = 1; kp < this.pieces.length; ++kp) {
    this.pieces[kp].moveTo(new Point(pnt.x + this.puzzle.dx * (this.pieces[kp].kx - this.pieces[0].kx ),
                                     pnt.y + this.puzzle.dy * (this.pieces[kp].ky - this.pieces[0].ky )));
  } // for kp
} // PolyPiece.prototype.moveTo

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
PolyPiece.prototype.ifNear = function(otherPoly) {

  let p1, p2;
  for (let kp = 0; kp < this.pieces.length; ++kp) {
    p1 = this.pieces[kp];
    for (let kn = 0; kn < otherPoly.pieces.length; ++kn) {
      p2 = otherPoly.pieces[kn];
// p2 above p1 ?
      if ((p1.kx == p2.kx && p1.ky == p2.ky + 1) &&
          (this.puzzle.near(p1, p2, 0, - 1))) return true;
// p2 below p1 ?
      if ((p1.kx == p2.kx && p1.ky == p2.ky - 1) &&
          (this.puzzle.near(p1, p2, 0, 1))) return true;
// p2 left of p1 ?
      if ((p1.kx - 1 == p2.kx && p1.ky == p2.ky) &&
          (this.puzzle.near(p1, p2, - 1, 0))) return true;
// p2 right of p1 ?
      if ((p1.kx + 1 == p2.kx && p1.ky == p2.ky) &&
          (this.puzzle.near(p1, p2, + 1, 0))) return true;
    } // for kn
  } // for kp
  return false; // no, not near
} // ifNear

// end class PolyPiece
//--------------------------------------------------------------
//--------------------------------------------------------------
// puzzle

/* see createPuzzle for the 'params' parameter
This constructor is used to load the picture, the actual construction of the
puzzle can't be done before picture dimensions are known
*/

function Puzzle(params) {

// image - by url (src) or straight image object
  if (typeof(params.img) == 'string') {
    this.image = new Image();
    this.image.src = params.img;
    this.image.addEventListener("load", (function(obj){
      return function() {
        obj.createPuzzle(params);
      }})(this));
  } else {
    this.image = params.img;
    this.createPuzzle(params);
  }

} // Puzzle

Puzzle.MARGIN1 = 5;
//--------------------------------------------------------------

/*
The given parameter if an object with the following properties :
 -  img, which may be:
  string type : an image url
  object type : an image object (with a ready loaded image)
 -  width : width available for the picture
 -  height : width available for the picture. The script will use the
width x height space as smartly as possible
 -  npieces : number of pieces. May be any (sensible) integer, the script
will choose a number of columns and rows to have pieces as square as possible,
and an actual total number of pieces as close as possible to this integer.
 -  idiv : div which will contail the game

*/

Puzzle.prototype.createPuzzle = function(params){

//  let kx, ky, x, y, dx, dy, p1, p2, p3, brd, s1, s2, s3, s4, s5, s6, s7, s8, s9, concav, width, height, nx, ny;

// we change width or height in order to keep the picture size ration
  let wi = this.image.width;  // from original picture
  let he = this.image.height;

  this.reqHeight = params.height; // requested height
  this.reqWidth = params.width;
  this.height = this.reqHeight - 2 * Puzzle.MARGIN1; // place left on screen including margin
  this.width = this.reqWidth - 2 * Puzzle.MARGIN1; //

  if (wi / he > this.width / this.height) { // actual picture "more horizontal" than game board
    this.height = this.width * he / wi;
  } else {
    this.width = this.height * wi / he;
  }
// end change width or height


// div Jeu - par nom (id) where directement objet
  if (typeof(params.idiv) == 'string') {
    this.divGame = document.getElementById(params.idiv);
  } else {
    this.divGame = params.idiv;
  }
  this.divGame.style.overflow = 'visible';
  this.divGame.style.position = 'relative';

// divBoard
  if (!this.divBoard) {
    this.divBoard = document.createElement('div');
    this.divGame.appendChild(this.divBoard);
  }
  this.divBoard.style.overflow = 'hidden';
  this.divBoard.style.position = 'absolute';
  this.divBoard.style.left = 0;
  this.divBoard.style.top = 0;

  this.listeners = []; // table of eventListeners to remove

/* provisional dimensions of the game, waiting for actual dimensions qui depend
on number of pieces
*/

  this.divGame.style.width = this.divBoard.style.width = this.width + 2 * Puzzle.MARGIN1 + "px";
  this.divGame.style.height = this.divBoard.style.height = this.height + 2 * Puzzle.MARGIN1 + "px";

// canv for the moving PolyPiece and the full image
  if (!this.canvMobile) {
    this.canvMobile = document.createElement('canvas');
    this.divBoard.appendChild(this.canvMobile);
  }
  this.canvMobile.style.visibility = 'visible';
  this.canvMobile.width = parseFloat(this.divBoard.style.width);
  this.canvMobile.height = parseFloat(this.divBoard.style.height);
  this.canvMobile.style.position = "absolute";
  this.canvMobile.style.top = "0px";
  this.canvMobile.style.left = "0px";

  this.canvMobile.style.zIndex = 50000;

  this.dCoupling = 10; // distance for pieces to couple together, in pixels (on each x and y axis)

  this.canvMobile.getContext("2d").drawImage(this.image,
                            0, 0, wi, he,
                            Puzzle.MARGIN1, Puzzle.MARGIN1, this.width, this.height);


  if (!this.menu) {
    this.menu = new Menu({
      parentDiv: this.divGame,
      idDivMenu: "divmenu",
      title: "MENU",
      lineOffset: 30,
      lineStep: 30,
      lines: [
        {text: "load image", func: this.loadImage()},
        {text: "12 piece", func: this.returnFunct(12)},
        {text: "25 piece", func: this.returnFunct(25)},
        {text: "50 piece", func: this.returnFunct(50)},
        {text: "100 piece", func: this.returnFunct(100)},
        {text: "200 piece", func: this.returnFunct(200)}
      ]
    });
  }
  if (autoStart) {
     this.npieces = 25;
     this.next();
  }
} // createPuzzle
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// function for menu actions

Puzzle.prototype.returnFunct = function(nbpieces) {

  let puz = this;
    return function() {
     puz.npieces = nbpieces;
     puz.next();
    }
} // returnFunct

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

Puzzle.prototype.loadImage = function () {

  let puz = this;
  return function() {
    uploadFile(() => {},
              {accept: 'image/*',
               readMethod: 'readAsDataURL',
               image: puz.image});
    }
}

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

Puzzle.prototype.next = function() {

  let nx, ny, dx, dy, kx, ky, x, y, p1, p2, p3, brd, s1, s2, s3, s4, s5, s6, s7, s8, s9, concav;
/* parameters for the shape of pieces edges
 despite of careful tweaking, I never got the shape I expected
*/

  let coeffDecentr = 0.15;
  let coeff1min = 0.8;
  let coeff1max = 0.9;
  let coeff2min = 0.1;
  let coeff2max = 0.15;
  let coeff3min = 0.05;
  let coeff3max = 0.1;
  let coeff4min = 0.15;
  let coeff4max = 0.2;

  this.canvMobile.style.visibility = 'hidden'; // hide the full picture

// evaluation of number of pieces

  this.computenxAndny();
  nx = this.nx;  ny = this.ny;

// re - evaluation of the dimensions of the picture, leaving a space for pieces on one side

  if (this.image.width / this.image.height <
       (this.reqWidth - 2 * Puzzle.MARGIN1) / (this.reqHeight - 2 * Puzzle.MARGIN1)) {
  /* actual picture "more vertical" than available place
    leave place on the right side */
    this.width = (this.reqWidth - 2 * Puzzle.MARGIN1) / (nx + 2) * nx;
    this.height = this.width / this.image.width * this.image.height;
    if (this.height > this.reqHeight - 2 * Puzzle.MARGIN1) {
      this.height = this.reqHeight - 2 * Puzzle.MARGIN1;
      this.width = this.height * this.image.width / this.image.height;
    }
    this.freeSpace = 0; // place left on the right
  } else {
/* actual picture "more horizontal" than available place
    leave place on the bottom side */
    this.height = (this.reqHeight - 2 * Puzzle.MARGIN1) / (ny + 2) * ny;
    this.width = this.height / this.image.height * this.image.width;
    if (this.width > this.reqWidth - 2 * Puzzle.MARGIN1) {
      this.width = this.reqWidth - 2 * Puzzle.MARGIN1;
      this.height = this.width * this.image.height / this.image.width;
    }
    this.freeSpace = 1; // place left under
  }

  let height = this.height, width = this.width;
  this.dx = dx = this.width / nx; // horizontal side of tiling
  this.dy = dy = this.height / ny; // vertical side of tiling

/* adjust coupling distance to size of tiles */
  this.dCoupling = Math.max(10, Math.min(dx, dy) / 10);

// "clean" the board
  while (this.divBoard.firstChild) this.divBoard.removeChild(this.divBoard.firstChild);
// but keep the canvMobile
  this.divBoard.appendChild(this.canvMobile);

  this.canvMobile.width = this.reqWidth;
  this.divGame.style.width
    = this.divBoard.style.width
    = this.canvMobile.width + "px";

  this.canvMobile.height = this.reqHeight;
  this.divGame.style.height
    = this.divBoard.style.height
    = this.canvMobile.height + "px";

// compute the shapes of the pieces

  let lSide = [];
  let rSide = [];
  for (ky = 0; ky <=  ny; ++ky) {
    if (ky == 0) y = 0; else if (ky == ny) y = height; else y = (ky + (2 * Math.random() - 1) * coeffDecentr) * dy;
    lSide[ky] = new Point(0, y);
    if (ky == 0) y = 0; else if (ky == ny) y = height; else y = (ky + (2 * Math.random() - 1) * coeffDecentr) * dy;
    rSide[ky] = new Point(this.width, y);
  } // compute left and right side

  let tSide = [];
  let bSide = [];
  for (kx = 0; kx <=  nx; ++kx) {
    if (kx == 0) x = 0; else if (kx == nx) x = width; else x = (kx + (2 * Math.random() - 1) * coeffDecentr) * dx;
    tSide[kx] = new Point(x, 0);
    if (kx == 0) x = 0; else if (kx == nx) x = width; else x = (kx + (2 * Math.random() - 1) * coeffDecentr) * dx;
    bSide[kx] = new Point(x, this.height);
  } // compute top and bottom sides

// vertices along horizontal axis
  let verticesH = [];
  for (ky = 0; ky < ny - 1; ++ky) {
    verticesH[ky] = [];
    for (kx = 0; kx < nx; ++kx) {
      x = (kx + 0.5 + (2 * Math.random() - 1) * coeffDecentr / 2) * dx;
      y = (ky + 1 + (2 * Math.random() - 1) * coeffDecentr) * dy;
      verticesH[ky][kx] = new Point(x, y);
    } // for kx
  } // for ky

// vertices along vertical axis
  let verticesV = [];
  for (kx = 0; kx < nx - 1; ++kx) {
    verticesV[kx] = [];
    for (ky = 0; ky < ny; ++ky) {
      y = (ky + 0.5 + (2 * Math.random() - 1) * coeffDecentr / 2) * dy;
      x = (kx + 1 + (2 * Math.random() - 1) * coeffDecentr) * dx;
      verticesV[kx][ky] = new Point(x, y);
    } // for kx
  } // for ky

// intersections of segments
// [ky][kx] containst teh coordinate of the bottom right corner of a cell
  let tbIntersect = [];
  for (ky = 0; ky < ny - 1; ++ky) {
    tbIntersect[ky] = [];
    for (kx = 0; kx < nx - 1; ++kx) {
      tbIntersect[ky][kx] = new Segment(verticesV[kx][ky], verticesV[kx][ky + 1])
         .intersect(new Segment(verticesH[ky][kx], verticesH[ky][kx + 1]));
    } // for kx
  } // for ky

// Array of pieces
  this.pieces = [];
  for (ky = 0; ky < ny; ++ky) {
    this.pieces[ky] = [];
      for (kx = 0; kx < nx; ++kx) {
      this.pieces[ky][kx] = new Piece(kx, ky);

      // upper side
      if (ky == 0) {
        this.pieces[ky][kx].ts.type = "d";
        this.pieces[ky][kx].ts.points = [tSide[kx].copy(), tSide[kx + 1].copy()];
      } else {
        this.pieces[ky][kx].ts.type = "z";
        if (kx == 0) p1 = lSide[ky]; else p1 = tbIntersect[ky - 1][kx - 1];
        p2 = verticesH[ky - 1][kx];
        if (kx == nx - 1) p3 = rSide[ky]; else p3 = tbIntersect[ky - 1][kx];
        this.pieces[ky][kx].ts.points = [p1.copy(), p2.copy(), p3.copy()];
      }
      // right side
      if (kx == nx - 1) {
        this.pieces[ky][kx].rs.type = "d";
        this.pieces[ky][kx].rs.points = [rSide[ky].copy(), rSide[ky + 1].copy()];
      } else {
        this.pieces[ky][kx].rs.type = "z";
        if (ky == 0) p1 = tSide[kx + 1]; else p1 = tbIntersect[ky - 1][kx];
        p2 = verticesV[kx][ky];
        if (ky == ny - 1) p3 = bSide[kx + 1]; else p3 = tbIntersect[ky][kx];
        this.pieces[ky][kx].rs.points = [p1.copy(), p2.copy(), p3.copy()];
      }
      // bottom side
      if (ky == ny - 1) {
        this.pieces[ky][kx].bs.type = "d";
        this.pieces[ky][kx].bs.points = [bSide[kx].copy(), bSide[kx + 1].copy()];
      } else {
        this.pieces[ky][kx].bs.type = "z";
        if (kx == 0) p1 = lSide[ky + 1]; else p1 = tbIntersect[ky][kx - 1];
        p2 = verticesH[ky][kx];
        if (kx == nx - 1) p3 = rSide[ky + 1]; else p3 = tbIntersect[ky][kx];
        this.pieces[ky][kx].bs.points = [p1.copy(), p2.copy(), p3.copy()];
      }
      // left side
      if (kx == 0) {
        this.pieces[ky][kx].ls.type = "d";
        this.pieces[ky][kx].ls.points = [lSide[ky].copy(), lSide[ky + 1].copy()];
      } else {
        this.pieces[ky][kx].ls.type = "z";
        if (ky == 0) p1 = tSide[kx]; else p1 = tbIntersect[ky - 1][kx - 1];
        p2 = verticesV[kx - 1][ky];
        if (ky == ny - 1) p3 = bSide[kx]; else p3 = tbIntersect[ky][kx - 1];
        this.pieces[ky][kx].ls.points = [p1.copy(), p2.copy(), p3.copy()];
      }
    } // for kx
  } // for ky

// transformation of sides
  for (ky = 0; ky < ny; ky++) {
    for (kx = 0; kx < nx; kx++) {

// bottom side
      if (ky < ny - 1) {
        brd = this.pieces[ky][kx].bs;
        s1 = new Segment(brd.points[0], brd.points[1]);
        s2 = new Segment(brd.points[2], brd.points[1]);
        concav = (s1.sin(s2) > 0);
        s1 = new Segment(s1.p1, s1.pointOnRelative(Math.random() * (coeff1max - coeff1min) + coeff1min));
        s3 = s1.perpendicularEnd(!concav);
        s3 = new Segment(s3.p1, s3.pointOnAbsolute(dy * (Math.random() * (coeff2max - coeff2min) + coeff2min)));
        s2 = new Segment(s2.p1, s2.pointOnRelative(Math.random() * (coeff1max - coeff1min) + coeff1min));
        s4 = s2.perpendicularEnd(concav);
        s4 = new Segment(s4.p1, s4.pointOnAbsolute(dy * (Math.random() * (coeff2max - coeff2min) + coeff2min)));
        s5 = new Segment(s3.p2, s4.p2);
        s6 = new Segment(s5.p1, s5.pointOnAbsolute( -dx * (Math.random() * (coeff3max - coeff3min) + coeff3min)));
        s5 = new Segment(s5.p2, s5.p1);
        s7 = new Segment(s5.p1, s5.pointOnAbsolute( -dx * (Math.random() * (coeff3max - coeff3min) + coeff3min)));
        s8 = s6.perpendicularEnd(concav);
        s8 = new Segment(s8.p1, s8.pointOnAbsolute(dy * (Math.random() * (coeff4max - coeff4min) + coeff4min)));
        s9 = s7.perpendicularEnd(!concav);
        s9 = new Segment(s9.p1, s9.pointOnAbsolute(dy * (Math.random() * (coeff4max - coeff4min) + coeff4min)));

        brd.points[0] = s1.p1.copy();
        brd.points[1] = s1.p2.copy();
        brd.points[2] = s3.p2.copy();
        brd.points[3] = s6.p2.copy();
        brd.points[4] = s8.p2.copy();
        brd.points[5] = s9.p2.copy();
        brd.points[6] = s7.p2.copy();
        brd.points[7] = s4.p2.copy();
        brd.points[8] = s2.p2.copy();
        brd.points[9] = s2.p1.copy();
      // duplicate as top side of cell below
        this.pieces[ky + 1][kx].ts = brd;
      } // end bottom side

// right side
      if (kx < nx - 1) {
        brd = this.pieces[ky][kx].rs;
        s1 = new Segment(brd.points[0], brd.points[1]);
        s2 = new Segment(brd.points[2], brd.points[1]);
        concav = (s1.sin(s2) > 0);
        s1 = new Segment(s1.p1, s1.pointOnRelative(Math.random() * (coeff1max - coeff1min) + coeff1min));
        s3 = s1.perpendicularEnd(!concav);
        s3 = new Segment(s3.p1, s3.pointOnAbsolute(dx * (Math.random() * (coeff2max - coeff2min) + coeff2min)));
        s2 = new Segment(s2.p1, s2.pointOnRelative(Math.random() * (coeff1max - coeff1min) + coeff1min));
        s4 = s2.perpendicularEnd(concav);
        s4 = new Segment(s4.p1, s4.pointOnAbsolute(dx * (Math.random() * (coeff2max - coeff2min) + coeff2min)));
        s5 = new Segment(s3.p2, s4.p2);
        s6 = new Segment(s5.p1, s5.pointOnAbsolute( - dy * (Math.random() * (coeff3max - coeff3min) + coeff3min)));
        s5 = new Segment(s5.p2, s5.p1);
        s7 = new Segment(s5.p1, s5.pointOnAbsolute( - dy * (Math.random() * (coeff3max - coeff3min) + coeff3min)));
        s8 = s6.perpendicularEnd(concav);
        s8 = new Segment(s8.p1, s8.pointOnAbsolute(dx * (Math.random() * (coeff4max - coeff4min) + coeff4min)));
        s9 = s7.perpendicularEnd(!concav);
        s9 = new Segment(s9.p1, s9.pointOnAbsolute(dx * (Math.random() * (coeff4max - coeff4min) + coeff4min)));

        brd.points[0] = s1.p1.copy();
        brd.points[1] = s1.p2.copy();
        brd.points[2] = s3.p2.copy();
        brd.points[3] = s6.p2.copy();
        brd.points[4] = s8.p2.copy();
        brd.points[5] = s9.p2.copy();
        brd.points[6] = s7.p2.copy();
        brd.points[7] = s4.p2.copy();
        brd.points[8] = s2.p2.copy();
        brd.points[9] = s2.p1.copy();
      // duplicate as left side of right cell
        this.pieces[ky][kx + 1].ls = brd;
      } // end of right side

    } // for kx
  } // for ky

  this.associateImage();

} // function next

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// called when picture is loaded

Puzzle.prototype.associateImage = function() {
  let kx, ky, kn, kp;
  let div, scale, he, wi, offsx, offsy, pc;

  // scale picture
  wi = this.image.width;
  he = this.image.height;

  if (wi / he > this.width / this.height) { // actual picture "more horizontal" than board
    scale = this.height / he;
    offsy = 0;
    offsx = (wi - this.width / scale) / 2; // offset in source picture
  } else { // actual picture "more (or equally)horizontal" than board
    scale = this.width / wi;
    offsx = 0;
    offsy = (he - this.height / scale) / 2; // offset in source picture
  }

  this.mech =  { scale: scale, offsx: offsx, offsy: offsy }; // informations for scaling

// creation of pieces
// table of PolyPieces
  this.polyPieces = [];
  let z = 1;
  for (ky = 0; ky < this.ny; ky++) {
    for (kx = 0; kx < this.nx; kx++) {
      this.pieces[ky][kx].createDivPiece(this, scale, offsx, offsy);
      this.polyPieces.push(new PolyPiece(this.pieces[ky][kx], z++, this));
    } // for kx
  } // for ky

  for (kp = 0; kp < this.polyPieces.length; kp++) {
    for (kn = 0; kn < this.polyPieces[kp].pieces.length; kn++) {
      pc = this.polyPieces[kp].pieces[kn];

      this.divBoard.appendChild(pc.theDiv);
      switch(this.freeSpace){
        case 0 : pc.pTarget = new Point(this.reqWidth - (2.25 + Math.random() / 4) * this.dx, Math.random() * (this.height -  this.dy) - this.dy);break;
        case 1 : pc.pTarget = new Point(Math.random() * (this.width -  this.dx) - this.dx, this.reqHeight - (2.25 + Math.random() / 4) * this.dy);
      } // switch
    } // for kn
  } // for kp
  window.setTimeout((function(obj) {return function() {obj.launchAnimation()}})(this), 1000);

} // Puzzle.prototype.associateImage

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

Puzzle.prototype.addRemovableEventListener = function(event, funct) {

  this.divBoard.addEventListener(event, funct);
  this.listeners.push({event: event, funct: funct});
} // Puzzle.prototype.addRemovableEventListener
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
Puzzle.prototype.remove1Listener = function() {
  if (this.listeners.length == 0 ) return; // ràf
  let a = this.listeners.pop();
  this.divBoard.removeEventListener(a.event, a.funct);
} // Puzzle.prototype.remove1Listener
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
Puzzle.prototype.removeAllListeners = function() {
  let a;
  while (this.listeners.length > 0 ) {
    a = this.listeners.pop();
    this.divBoard.removeEventListener(a.event, a.funct);
  } // while
} // Puzzle.prototype.removeAllListeners()
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

Puzzle.prototype.launchAnimation = function() {

  this.anim = {cpt: autoStart ? 200 : 100 };
  this.anim.tmr = window.setInterval((function(puzz){return function(){puzz.animate()}})(this), 20);

} // launchAnimation
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

Puzzle.prototype.animate = function() {
  let kp, kn, pc, act, cib;

  if (this.anim.cpt == 0){
    window.clearInterval(this.anim.tmr);
    delete this.anim;

    this.evaluateZIndex();
    this.beginGame();

    return;
  }
  this.anim.cpt--;
  for (kp = 0; kp < this.polyPieces.length; kp++) {
    for (kn = 0; kn < this.polyPieces[kp].pieces.length; kn++) {
      pc = this.polyPieces[kp].pieces[kn];
      act = pc.where();
      cib = pc.pTarget;
      pc.moveTo(new Point((this.anim.cpt * act.x + cib.x) / (this.anim.cpt + 1), (this.anim.cpt * act.y + cib.y) / (this.anim.cpt + 1)));
      if (this.anim.cpt == 0) { delete pc.pTarget ; }
    } // for kn
  } // for kp
} // Puzzle.prototype.animate

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// almost the same as 'animate, mais only to center the picture when game is over

Puzzle.prototype.animateEnd = function() {
  let xcou, ycou;

  if (this.anim.cpt == 0){
    window.clearInterval(this.anim.tmr);
    delete this.anim;
    return;
  }
  this.anim.cpt--;
  xcou = parseFloat(this.canvMobile.style.left);
  ycou = parseFloat(this.canvMobile.style.top);

  this.canvMobile.style.left = (this.anim.cpt * xcou + this.anim.xfin) / (this.anim.cpt + 1) + "px";
  this.canvMobile.style.top = (this.anim.cpt * ycou + this.anim.yfin) / (this.anim.cpt + 1) + "px";

} // Puzzle.prototype.animateEnd


// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// merges polyPieces[n2] and polyPieces[n1] into a new piece
// removes those pieces and inserts nes one
// re evaluates z-orders accordingly
// return index of new polyPiece

Puzzle.prototype.merge = function(n1, n2) {

  let nppiece, nbpieces, k;
  this.polyPieces[n1].merge(this.polyPieces[n2]); // merges pieces
  nppiece = this.polyPieces[n1]; // save new piece
  if (n1 > n2) {
    this.polyPieces.splice(n1, 1);
    this.polyPieces.splice(n2, 1);
  } else {
    this.polyPieces.splice(n2, 1);
    this.polyPieces.splice(n1, 1);
  }

// will insert nes PolyPiece immediately before the first with less pieces
  nbpieces = nppiece.pieces.length;
  for (k = 0; k < this.polyPieces.length && this.polyPieces[k].pieces.length >= nbpieces; k++) {;}
  // insert new
  this.polyPieces.splice(k, 0, nppiece);

  return k;
} // puzzle.prototype.merge

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

Puzzle.prototype.evaluateZIndex = function() {

  let kp, kn, z;
  z = 1;
  for (kp = 0; kp < this.polyPieces.length; kp++) {
    for (kn = 0; kn < this.polyPieces[kp].pieces.length; kn++) {
      this.polyPieces[kp].pieces[kn].theDiv.style.zIndex = z++;
    } // for kn
  } // for kp

} // Puzzle.prototype.evaluateZIndex

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// beginning of game
Puzzle.prototype.beginGame = function() {

// record offset between mouse coordinates et board origin

  let styl = getComputedStyle(this.divGame);
  this.mouseOffsX = this.divGame.offsetLeft + parseFloat(styl.borderLeftWidth);
  this.mouseOffsY = this.divGame.offsetTop + parseFloat(styl.borderTopWidth);
  this.pieceMove = false; // no selected piece
// set event listeners
  this.addRemovableEventListener("mousedown", (function(puzzle){
                                                return function(event) {
                                                    puzzle.mouseDownGame(event);}})(this));
  this.addRemovableEventListener("mouseup", (function(puzzle){
                                                return function(event) {
                                                    puzzle.mouseUpGame(event);}})(this));
  this.addRemovableEventListener("mousemove", (function(puzzle){
                                                return function(event) {
                                                    puzzle.mouseMoveGame(event);}})(this));
} // Puzzle.prototype.beginGame

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

// mouseDown during game
Puzzle.prototype.mouseDownGame = function(event) {

  this.pieceMove = this.lookForPiece(event) ;
  if (this.pieceMove === false) return;
  this.emphasize(this.pieceMove.pp);
// we will add to the 'this.pieceMove' object the offset between mousePosition and
//   canvMobile position for proper movement of canvMobile when mose moves

  this.pieceMove.offsx =  event.pageX - this.mouseOffsX - parseFloat(this.canvMobile.style.left);
  this.pieceMove.offsy =  event.pageY - this.mouseOffsY - parseFloat(this.canvMobile.style.top);
  this.divGame.style.cursor = 'move';

} // Puzzle.prototype.mouseDownGame
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

// mouseUp during game
Puzzle.prototype.mouseUpGame = function(event) {

  let k, polyP, pc;

  this.divGame.style.cursor = 'default';

  if (this.pieceMove === false) return;

// hide the canvasMobile which was used for the moving piece
  let canvx = parseFloat(this.canvMobile.style.left);
  let canvy = parseFloat(this.canvMobile.style.top);
  this.canvMobile.getContext("2d").clearRect(0, 0, this.canvMobile.width, this.canvMobile.height);

// display again original pieces
  polyP = this.polyPieces[this.pieceMove.pp];
  for (k = 0; k < polyP.pieces.length; k++) {
    pc = polyP.pieces[k]
    pc.moveTo (new Point( this.dx * (pc.kx - 1) + canvx, this.dy * (pc.ky - 1) + canvy));
    pc.theDiv.style.visibility = 'visible';
  } // for k

// check if moved piece is close enough of another to merge them
//  check again with the result of the merge operation

  let idp = this.pieceMove.pp;
  let yesMerge = false, yesyesMerge = false;
  do {
    yesMerge = false;
    polyP = this.polyPieces[idp];
    for (k = 0; k < this.polyPieces.length; k++) {
      if (k ===  idp) continue; // don't check neighborhood with itself !
      if (polyP.ifNear(this.polyPieces[k])) { // yes !
        idp = this.merge(k, idp); // merge and keep track of index of merged piece
        yesMerge = true; yesyesMerge = true; // il y a fusion de 2 pièces
        break; // out of  'for' loop
      } // if we found a piece
    } // for
  } while (yesMerge) ; // do it again if pieces werge merged

// if no merging, move (if this.polypieces) the selected PolyPiece before
// those with the same number of pieces

  if (! yesyesMerge) {
    let tmp = this.polyPieces[idp]; // memorize polyPiece
    this.polyPieces.splice(idp, 1); // remove from list
    for (k = idp; (k < this.polyPieces.length) && (this.polyPieces[k].pieces.length >= tmp.pieces.length); k++) ;
    this.polyPieces.splice(k, 0, tmp); // re-insert at the right place
  } // if no merging

  this.evaluateZIndex();
  this.pieceMove = false;

// won ?
  if (this.polyPieces.length>1) return; // no, continue

// YES ! tell the player
  this.removeAllListeners();
// normal image id re-drawn
  let ctx = this.canvMobile.getContext("2d");
  ctx.drawImage(this.image,
                this.mech.offsx, this.mech.offsy,
                this.width / this.mech.scale, this.height / this.mech.scale,
                0, 0,
                this.width, this.height);
  this.anim = {cpt: 100, xorg: 0, yorg: 0, xfin: (this.reqWidth - this.dx * this.nx) / 2,
                                   yfin: (this.reqHeight - this.dy * this.ny) / 2};

  this.anim.xorg = parseFloat(this.polyPieces[0].pieces[0].theDiv.style.left) + this.dx;
  this.anim.yorg = parseFloat(this.polyPieces[0].pieces[0].theDiv.style.top) + this.dy
  this.canvMobile.style.left = this.anim.xorg + "px";
  this.canvMobile.style.top = this.anim.yorg + "px";

// hide pieces
  for (k = 0; k < this.polyPieces[0].pieces.length; k++) {
    this.polyPieces[0].pieces[k].theDiv.style.visibility = "hidden";
  } // for k

// launch final animation

  let dist = Math.sqrt(
             (this.anim.xorg - this.anim.xfin) * (this.anim.xorg - this.anim.xfin) +
             (this.anim.yorg - this.anim.yfin) * (this.anim.yorg - this.anim.yfin));
// we want a speed of about 100 pix / s
// the time increment beeing of 20 ms, this leads to 100 * 0.02 = 2 pix / pass
    this.anim.cpt = dist / 2;
// limit the duration to the range 0.25..2s, i.e.12..100 steps
    if (this.anim.cpt < 12) this.anim.cpt = 12;
    if (this.anim.cpt > 100) this.anim.cpt = 100;
    this.anim.cpt = Math.floor(this.anim.cpt);
  this.anim.tmr = window.setInterval((function(puzz){return function(){puzz.animateEnd()}})(this), 20);

} // Puzzle.prototype.mouseUpGame
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

// mouseMove during game
Puzzle.prototype.mouseMoveGame = function(event) {

  if (this.pieceMove === false) return;

// for the case where button was released out of 'good' area

  if ((event.buttons & 1) == 0) { this.mouseUpGame(event); return; }

  let x =  event.pageX - this.mouseOffsX;
  let y =  event.pageY - this.mouseOffsY;
  if (x < 2) x = 2;
  if (x > Math.floor(parseFloat(this.divBoard.style.width)) - 2) x  = Math.floor(parseFloat(this.divBoard.style.width)) - 2;
  if (y < 2) y = 2;
  if (y > Math.floor(parseFloat(this.divBoard.style.height)) - 2) y  = Math.floor(parseFloat(this.divBoard.style.height)) - 2;

  this.canvMobile.style.left = (x - this.pieceMove.offsx) + "px";
  this.canvMobile.style.top = (y - this.pieceMove.offsy) + "px";

} // Puzzle.prototype.mouseMoveGame

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// searches the pieces whick was clicked on
// event is the click event
// returned value : (index of PolyPiece + piece) or false (if not on a piece)

Puzzle.prototype.lookForPiece = function(event) {

  let kp, kn, z;
  let x =  event.pageX - this.mouseOffsX;
  let y =  event.pageY - this.mouseOffsY;
  for (kp = this.polyPieces.length - 1; kp >= 0; kp--) {
    for (kn = this.polyPieces[kp].pieces.length - 1; kn >= 0; kn--) {
      if (this.polyPieces[kp].pieces[kn].insidePiece(x, y)) return {pp: kp, pc: kn};
    } // for kn
  } // for kp

  return false; // found nothing
} // Puzzle.prototype.lookForPiece

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
// emphasizes a polyPiece
// its idividualpieces are masked (style.visibility = "hidden")
// but they are collectively drawn on canvMobile
// parameter : polyPiece index

Puzzle.prototype.emphasize = function(npp) {

  let kbcl, kc, k;
  let ppc = this.polyPieces[npp]; // current PolyPiece
  let ctx = this.canvMobile.getContext("2d");
  let loops = lookForLoops(ppc.pieces);
  let edge;

  ctx.save();
  ctx.clearRect(0, 0, this.canvMobile.width, this.canvMobile.height);
  ctx.beginPath();
  for (kbcl = 0;kbcl < loops.length; kbcl++) {
    for (kc = 0; kc < loops[kbcl].length; kc++) {
      edge = loops[kbcl][kc];

      switch (edge.edge) {
        case 0 : ppc.pieces[edge.kp].ts.drawPath(ctx, 0, 0, false, (kc!= 0)); break;
        case 1 : ppc.pieces[edge.kp].rs.drawPath(ctx, 0, 0, false, (kc!= 0)); break;
        case 2 : ppc.pieces[edge.kp].bs.drawPath(ctx, 0, 0, true, (kc!= 0)); break;
        case 3 : ppc.pieces[edge.kp].ls.drawPath(ctx, 0, 0, true, (kc!= 0)); break;
      }
    } // for kc
  } // for kbcl;

// make shadow
  ctx.fillStyle = 'none';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.fill();

// add image clipped by path
  ctx.clip('evenodd');

  ctx.drawImage(this.image,
                this.mech.offsx, this.mech.offsy,
                this.width / this.mech.scale, this.height / this.mech.scale,
                0, 0,
                this.width, this.height);

// hide original PolyPiece
  for (k = 0; k < ppc.pieces.length; k++) {
    ppc.pieces[k].theDiv.style.visibility = "hidden";
  } // for k

  ctx.restore();

// set picture position to hide previous one
  this.canvMobile.style.left = (ppc.pieces[0].where().x - (ppc.pieces[0].kx - 1) * this.dx) + "px";
  this.canvMobile.style.top = (ppc.pieces[0].where().y - (ppc.pieces[0].ky - 1) * this.dy) + "px";
  this.canvMobile.style.visibility = 'visible';

} // emphasize

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -

// checks if p1 and p2 pieces are close to each other
// dx is -1, 0 or 1 to check left, (top or bottom) or right side of p1
// dy is -1, 0 or 1 to check top, (left or right) or bottom of p2

Puzzle.prototype.near  = function (p1, p2, dx, dy) {
  let ou1 = p1.where();
  let ou2 = p2.where();

  if (Math.abs (ou1.x - ou2.x + dx * this.dx) > this.dCoupling) return false;
  if (Math.abs (ou1.y - ou2.y + dy * this.dy) > this.dCoupling) return false;
  return true;
} // near

// fin class puzzle

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -   -
/* computes the number of lines and columns of the puzzle,
  finding the best compromise between the requested number of pieces
  and a square shap for pieces
*/

Puzzle.prototype.computenxAndny = function() {

  let kx, ky, width = this.image.width, height = this.image.height, npieces = this.npieces;
  let err, err2, errmin = 1e9;
  let ncv, nch;

  let nHPieces = Math.round(Math.sqrt(npieces * width / height));
  let nVPieces = Math.round(npieces / nHPieces);


/* based on the above estimation, we will try up to + / - 2 values
   and evaluate (arbitrary) quality criterion to keep best result
*/

  for (ky = 0;ky < 5;ky++) {
    ncv = nVPieces + ky - 2;
    for (kx = 0;kx < 5;kx++) {
      nch = nHPieces + kx - 2;
      err = nch * height / ncv / width;
      err = (err + 1 / err) - 2; // error on pieces dimensions rationmesure erreur sur proportions des pièces (par rapport à un carré)
      err += Math.abs(1 - nch * ncv / npieces); // adds error on number of pieces

      if (err < errmin) { // keep smallest error
        errmin = err;
        this.nx = nch;
        this.ny = ncv;
      }
    } // for kx
  } // for ky

} // computenxAndny

//---------------------------------------------------------------------------- -
//---------------------------------------------------------------------------- -

/* algorithm to determine the boundary of a PolyPiece
  input : a table of cells, hopefully defining a 'good' PolyPiece, i.e. all connected together
  every cell is given as an object {kx: indice, ky: indice} representing an element of a 2D array.

  returned value : table of Loops, because the boundary may be made of several
simple loops : there may be a 'hole' in a PolyPiece
every loop is a list of consecutive edges,
every edge if an object {kp: index, edge: b} where kp is the index of the cell ine
the input array, and edge the side (0(top), 1(right), 2(bottom), 3(left))
every edge contains kx and ky too, normally not used here
*/

function lookForLoops (tbCases) {

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
// internal : checks if an edge given by kx, ky is common with another cell
// returns true or false

  function edgeIsCommon (kx, ky, edge) {
    let k;
    switch(edge) {
      case 0 : ky--; break; // top edge
      case 1 : kx++; break; // right edge
      case 2 : ky++; break; // bottom edge
      case 3 : kx--; break; // left edge
    } // switch
    for (k = 0; k < tbCases.length;k++) {
      if (kx == tbCases[k].kx && ky == tbCases[k].ky) return true; // we found the neighbor
    }
    return false; // not a common edge
  } // function edgeIsCommon

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
// internal : checks if an edge given by kx, ky is in tbEdges
// return index in tbEdges, or false

  function edgeIsInTbEdges (kx, ky, edge) {
    let k;
    for (k = 0; k < tbEdges.length;k++) {
      if (kx == tbEdges[k].kx && ky == tbEdges[k].ky && edge == tbEdges[k].edge) return k; // found it
    }
    return false; // not found
  } // function edgeIsInTbEdges

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

  let tbLoops = []; // for the result
  let tbEdges = []; // set of edges which are not shared by 2 pieces of input
  let k;
  let kEdge; // pour count 4 edges
  let lp; // for loop during its creation
  let currEdge; // current edge
  let tries; // tries counter
  let edgeNumber; // number of edge found during research
  let potNext;

// table of tries
// used to determine what is the next edge to try when walking around a loop
// contient 1 élément par edge, en fonction du edge sur lequel on se trouve
//  chaque élément contient 3 tentatives à essayer dans l'ordre pour toujours tourner dans le même sens
//  chaque tentative contient le dkx et le dky pour indiquer la position du voisin concerné
//   et un edge pour dire quel est le prochain edge
// (avec ce tableau, les bords sont parcourus dans le sens où le programme les dessine)

  let tbTentatives = [
  // if we are on edge 0 (top)
    [
      {dkx: 0, dky: 0, edge: 1}, // try # 0
      {dkx: 1, dky: 0, edge: 0}, // try # 1
      {dkx: 1, dky: -1, edge: 3} // try # 2
    ],
  // if we are on edge 1 (right)
    [
      {dkx: 0, dky: 0, edge: 2},
      {dkx: 0, dky: 1, edge: 1},
      {dkx: 1, dky: 1, edge: 0}
    ],
  // if we are on edge 2 (bottom)
    [
      {dkx: 0, dky: 0, edge: 3},
      {dkx: - 1, dky: 0, edge: 2},
      {dkx: - 1, dky: 1, edge: 1}
    ],
  // if we are on edge 3 (left)
    [
      {dkx: 0, dky: 0, edge: 0},
      {dkx: 0, dky: - 1, edge: 3},
      {dkx: - 1, dky: - 1, edge: 2}
    ],
  ];


// create list of not shared edges (=> belong to boundary)
  for (k = 0;k < tbCases.length;k++) {
    for (kEdge = 0; kEdge < 4; kEdge++) {
      if (!edgeIsCommon(tbCases[k].kx, tbCases[k].ky, kEdge))
           tbEdges.push({kx: tbCases[k].kx, ky: tbCases[k].ky, edge: kEdge, kp: k})
    } // for kEdge
  } // for k

  while (tbEdges.length > 0) {
    lp = []; // new loop
    currEdge = tbEdges[0];   // we begin with first available edge
    lp.push(currEdge);       // add it to loop
    tbEdges.splice(0, 1);    // remove from list of available sides
    do {
      for (tries = 0; tries < 3;tries++) {
        potNext = tbTentatives[currEdge.edge][tries];
        edgeNumber = edgeIsInTbEdges(currEdge.kx + potNext.dkx, currEdge.ky + potNext.dky, potNext.edge);
        if (edgeNumber === false) continue; // can't here
        // new element in loop
        currEdge = tbEdges[edgeNumber];     // new current edge
        lp.push(currEdge);              // add it to loop
        tbEdges.splice(edgeNumber, 1);  // remove from list of available sides
        break; // stop tries !
      } // for tries
      if (edgeNumber === false) break; // loop is closed
    } while (1); // do-while exited by break
    tbLoops.push(lp); // add this loop to loops list
  } // while tbEdges...
  return tbLoops;
} // function lookForLoops

//---------------------------------------------------------------------------- -

window.addEventListener("load", function(){

let img = 'https://storage.ning.com/topology/rest/1.0/file/get/8253083489?profile=RESIZE_1200x';

autoStart = isMiniature(); // used for nice miniature in CodePen

let x = new Puzzle ( {img: img,
                      width: window.innerWidth,
                      height: window.innerHeight,
                      idiv: "forPuzzle" });

});