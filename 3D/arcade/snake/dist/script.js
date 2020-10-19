// SupportFuncs.js
function gRI(min, max) { // getRandomInt (max exclusive)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getAllIndexes(arr, val) { // Like indexOf but just return all indexes
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}
function LightenColor(color, percent) {
    var num = parseInt(color.replace("#",""),16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};
console.log(LightenColor("#ff0000",0.5));
/////////////////////////////////////////
// food.js
class Food{
    constructor(field){
        this.field = {x:field.w,y:field.h};
        this.x = gRI(0,field.w-1);
        this.y = gRI(0,field.h-1);
        while (field.area[this.y][this.x] != "A"){
            this.x = gRI(1,field.w -1);
            this.y = gRI(1,field.h - 1);
        }
        field.area[this.y][this.x] = "F";
    }

}
/////////////////////////////////////////////
// snake.js
arrsa = JSON.parse('[[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":4,"n":4}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":4,"n":5}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":3,"n":6}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":2,"n":7}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":1,"n":8}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":0,"n":10}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":1,"s":0,"w":0,"n":8}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":2,"s":0,"w":0,"n":7}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":3,"s":0,"w":0,"n":6}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":4,"s":0,"w":0,"n":5}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":4,"s":0,"w":0,"n":4}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":5,"n":4}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":4,"n":4}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":3,"n":6}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":2,"n":8}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":2,"n":12}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":0,"n":15}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":2,"s":0,"w":0,"n":12}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":2,"s":0,"w":0,"n":8}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":3,"s":0,"w":0,"n":6}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":4,"s":0,"w":0,"n":4}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":5,"s":0,"w":0,"n":4}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":6,"n":3}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":6,"n":3}},{"walls":{"e":1,"s":1,"w":-1,"n":-1},"food":{"e":0,"s":0,"w":10,"n":10}},{"walls":{"e":1,"s":0,"w":-1,"n":-1},"food":{"e":0,"s":0,"w":10,"n":10}},{"walls":{"e":1,"s":0,"w":-1,"n":-1},"food":{"e":0,"s":0,"w":8,"n":12}},{"walls":{"e":1,"s":0,"w":1,"n":-2},"food":{"e":0,"s":0,"w":0,"n":20}},{"walls":{"e":-1,"s":0,"w":1,"n":-1},"food":{"e":8,"s":0,"w":0,"n":12}},{"walls":{"e":-1,"s":0,"w":1,"n":-1},"food":{"e":10,"s":0,"w":0,"n":10}},{"walls":{"e":-1,"s":1,"w":1,"n":-1},"food":{"e":10,"s":0,"w":0,"n":10}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":6,"s":0,"w":0,"n":3}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":6,"s":0,"w":0,"n":3}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":7,"n":2}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":8,"n":2}},{"walls":{"e":0,"s":1,"w":-1,"n":-1},"food":{"e":0,"s":0,"w":10,"n":10}},{"walls":{"e":0,"s":0,"w":-2,"n":-2},"food":{"e":0,"s":0,"w":10,"n":10}},{"walls":{"e":1,"s":1,"w":-3,"n":-3},"food":{"e":0,"s":0,"w":12,"n":13}},{"walls":{"e":2,"s":2,"w":2,"n":-7},"food":{"e":0,"s":0,"w":0,"n":25}},{"walls":{"e":-3,"s":1,"w":1,"n":-3},"food":{"e":12,"s":0,"w":0,"n":13}},{"walls":{"e":-2,"s":0,"w":0,"n":-2},"food":{"e":10,"s":0,"w":0,"n":10}},{"walls":{"e":-1,"s":1,"w":0,"n":-1},"food":{"e":10,"s":0,"w":0,"n":10}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":8,"s":0,"w":0,"n":2}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":7,"s":0,"w":0,"n":2}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":8,"n":1}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":12,"n":2}},{"walls":{"e":0,"s":1,"w":-1,"n":-1},"food":{"e":0,"s":0,"w":12,"n":8}},{"walls":{"e":1,"s":1,"w":-3,"n":-3},"food":{"e":0,"s":0,"w":13,"n":12}},{"walls":{"e":5,"s":5,"w":-5,"n":-5},"food":{"e":0,"s":0,"w":15,"n":15}},{"walls":{"e":10,"s":10,"w":10,"n":-99},"food":{"e":0,"s":0,"w":0,"n":35}},{"walls":{"e":-5,"s":5,"w":5,"n":-5},"food":{"e":15,"s":0,"w":0,"n":15}},{"walls":{"e":-3,"s":1,"w":1,"n":-3},"food":{"e":13,"s":0,"w":0,"n":12}},{"walls":{"e":-1,"s":1,"w":0,"n":-1},"food":{"e":12,"s":0,"w":0,"n":8}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":12,"s":0,"w":0,"n":2}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":8,"s":0,"w":0,"n":1}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":10,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":15,"n":0}},{"walls":{"e":0,"s":1,"w":-2,"n":1},"food":{"e":0,"s":0,"w":20,"n":0}},{"walls":{"e":2,"s":2,"w":-7,"n":2},"food":{"e":0,"s":0,"w":25,"n":0}},{"walls":{"e":10,"s":10,"w":-99,"n":10},"food":{"e":0,"s":0,"w":35,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":0,"w":0,"n":0}},{"walls":{"e":-99,"s":10,"w":10,"n":10},"food":{"e":35,"s":0,"w":0,"n":0}},{"walls":{"e":-7,"s":2,"w":2,"n":2},"food":{"e":25,"s":0,"w":0,"n":0}},{"walls":{"e":-2,"s":1,"w":0,"n":1},"food":{"e":20,"s":0,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":15,"s":0,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":10,"s":0,"w":0,"n":0}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":1,"w":8,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":2,"w":12,"n":0}},{"walls":{"e":0,"s":-1,"w":-1,"n":1},"food":{"e":0,"s":8,"w":12,"n":0}},{"walls":{"e":1,"s":-3,"w":-3,"n":1},"food":{"e":0,"s":12,"w":13,"n":0}},{"walls":{"e":5,"s":-5,"w":-5,"n":5},"food":{"e":0,"s":15,"w":15,"n":0}},{"walls":{"e":10,"s":-99,"w":10,"n":10},"food":{"e":0,"s":35,"w":0,"n":0}},{"walls":{"e":-5,"s":-5,"w":5,"n":5},"food":{"e":15,"s":15,"w":0,"n":0}},{"walls":{"e":-3,"s":-3,"w":1,"n":1},"food":{"e":13,"s":12,"w":0,"n":0}},{"walls":{"e":-1,"s":-1,"w":0,"n":1},"food":{"e":12,"s":8,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":12,"s":2,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":8,"s":1,"w":0,"n":0}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":2,"w":7,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":2,"w":8,"n":0}},{"walls":{"e":0,"s":-1,"w":-1,"n":1},"food":{"e":0,"s":10,"w":10,"n":0}},{"walls":{"e":0,"s":-2,"w":-2,"n":0},"food":{"e":0,"s":10,"w":10,"n":0}},{"walls":{"e":1,"s":-3,"w":-3,"n":1},"food":{"e":0,"s":13,"w":12,"n":0}},{"walls":{"e":2,"s":-7,"w":2,"n":2},"food":{"e":0,"s":25,"w":0,"n":0}},{"walls":{"e":1,"s":-3,"w":-3,"n":1},"food":{"e":12,"s":13,"w":0,"n":0}},{"walls":{"e":-2,"s":-2,"w":0,"n":0},"food":{"e":10,"s":10,"w":0,"n":0}},{"walls":{"e":-1,"s":-1,"w":0,"n":1},"food":{"e":10,"s":10,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":8,"s":2,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":7,"s":2,"w":0,"n":0}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":3,"w":6,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":3,"w":6,"n":0}},{"walls":{"e":1,"s":-1,"w":-1,"n":1},"food":{"e":0,"s":10,"w":10,"n":0}},{"walls":{"e":1,"s":-1,"w":-1,"n":0},"food":{"e":0,"s":10,"w":10,"n":0}},{"walls":{"e":1,"s":-1,"w":-1,"n":0},"food":{"e":0,"s":12,"w":8,"n":0}},{"walls":{"e":1,"s":-2,"w":1,"n":0},"food":{"e":0,"s":20,"w":0,"n":0}},{"walls":{"e":-1,"s":-1,"w":1,"n":0},"food":{"e":8,"s":12,"w":0,"n":0}},{"walls":{"e":-1,"s":-1,"w":1,"n":0},"food":{"e":10,"s":10,"w":0,"n":0}},{"walls":{"e":-1,"s":-1,"w":1,"n":1},"food":{"e":10,"s":10,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":6,"s":3,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":6,"s":3,"w":0,"n":0}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":4,"w":5,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":4,"w":4,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":6,"w":3,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":8,"w":2,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":12,"w":2,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":15,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":2,"s":12,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":2,"s":8,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":3,"s":6,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":4,"s":4,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":5,"s":4,"w":0,"n":0}}],[{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":4,"w":4,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":5,"w":4,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":6,"w":3,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":7,"w":2,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":8,"w":1,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":0,"s":10,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":1,"s":8,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":2,"s":7,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":3,"s":5,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":4,"s":6,"w":0,"n":0}},{"walls":{"e":0,"s":0,"w":0,"n":0},"food":{"e":4,"s":4,"w":0,"n":0}}]]')
console.log("LENGTH",arrsa.length);




class Snake{
    constructor(w,h,arrInp,field,color) {
        this.view = {w:w,h:h};
        this.poss = arrInp;
        this.dead = false;
        this.color = color;
        for (let i = 0; i <  this.poss.length; i++){
            field.area[this.poss[i].y][this.poss[i].x] = "W"
        }

        this.pos = this.poss[0];
        this.view.area = arrsa;
    }
    wSum(field){ // return sum of all weights (food and walls)
        let dirObj = {e:0,s:0,w:0,n:0}; // returning object that have sum of detects cell
        for (let i = 0; i < this.view.h; i++){
            for (let g = 0; g < this.view.w; g++){
                let posNX = this.pos.x - (this.view.w - 1)/2 + g;
                let posNY = this.pos.y - (this.view.h - 1)/2 + i;
                if ((posNX >=0 && posNX < field.w) && (posNY >=0 && posNY < field.h)) {
                    if (field.area[posNY][posNX] == "F") {
                        dirObj.e += this.view.area[i][g].food.e;
                        dirObj.s += this.view.area[i][g].food.s;
                        dirObj.w += this.view.area[i][g].food.w;
                        dirObj.n += this.view.area[i][g].food.n;
                    } else if (field.area[posNY][posNX] == "W") {
                        dirObj.e += this.view.area[i][g].walls.e;
                        dirObj.s += this.view.area[i][g].walls.s;
                        dirObj.w += this.view.area[i][g].walls.w;
                        dirObj.n += this.view.area[i][g].walls.n;
                    }
                }
            }
        }
        return [dirObj.e,dirObj.s,dirObj.w,dirObj.n]
    }
    makeStep(field) {
        if (!this.dead) {
            field.area[this.poss[0].y][this.poss[0].x] = "W";

            let dirObj = this.wSum(field);
            let possibleWays = getAllIndexes(dirObj, Math.max(...dirObj));
            possibleWays = possibleWays[gRI(0, possibleWays.length - 1)];

            let newHead = {x: this.pos.x, y: this.pos.y};
            switch (possibleWays) {
                case 0:
                    newHead.x += 1;
                    break;
                case 1:
                    newHead.y += 1;
                    break;
                case 2:
                    newHead.x -= 1;
                    break;
                case 3:
                    newHead.y -= 1;
            }
            this.poss.unshift(newHead);
            this.pos = this.poss[0];
            if (field.area[this.pos.y][this.pos.x] == "F") {
                let f = new Food(field);
                field.area[this.poss[0].y][this.poss[0].x] = "W"

            } else if (field.area[this.pos.y][this.pos.x] == "W") {
                this.dead = true
                field.area[this.poss[0].y][this.poss[0].x] = "W";
                field.area[this.poss[this.poss.length - 1].y][this.poss[this.poss.length - 1].x] = "A";
                this.poss.splice(this.poss.length - 1);
            } else {
                field.area[this.poss[0].y][this.poss[0].x] = "W";
                field.area[this.poss[this.poss.length - 1].y][this.poss[this.poss.length - 1].x] = "A";
                this.poss.splice(this.poss.length - 1);


            }


        }
    }


    draw(ctx,w,h,field){
        for (let i = 0; i < this.poss.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.dead ? "gray" : (i == 0 ? LightenColor(this.color,-70) : this.color);
            let s = Math.min(w, h);
            ctx.fillRect(this.poss[i].x * (s / field.w), this.poss[i].y * (s / field.h), s / field.w, s / field.h);
            ctx.closePath();
        }
    }
}
///////////////////////////////////////////
// SnakeSelf.js
class SnakeSelf{
    constructor(arrInp,field,color) {
        this.stept = false;
        this.poss = arrInp;
        this.dead = false;
        this.color = color;
        this.dirObj = {dir:"WEST"};
        this.dir = this.dirObj.dir;
        for (let i = 0; i <  this.poss.length; i++){
            field.area[this.poss[i].y][this.poss[i].x] = "W"
        }

        this.pos = this.poss[0];
    }
    makeStep(field) {
        if (!this.dead) {
            console.log("THIS DIR: ", this.dir);
            field.area[this.poss[0].y][this.poss[0].x] = "W";
            let newHead = {x: this.pos.x, y: this.pos.y};
            switch (this.dir) {
                case "EAST":
                    newHead.x += 1;
                    break;
                case "SOUTH":
                    newHead.y += 1;
                    break;
                case "WEST":
                    newHead.x -= 1;
                    break;
                case "NORTH":
                    newHead.y -= 1;
            }
            this.poss.unshift(newHead);
            this.pos = this.poss[0];
            if (field.area[this.pos.y][this.pos.x] == "F") {
                let f = new Food(field);
                field.area[this.poss[0].y][this.poss[0].x] = "W"

            } else if (field.area[this.pos.y][this.pos.x] == "W") {
                this.dead = true
                field.area[this.poss[0].y][this.poss[0].x] = "W";
                field.area[this.poss[this.poss.length - 1].y][this.poss[this.poss.length - 1].x] = "A";
                this.poss.splice(this.poss.length - 1);
            } else {
                field.area[this.poss[0].y][this.poss[0].x] = "W";
                field.area[this.poss[this.poss.length - 1].y][this.poss[this.poss.length - 1].x] = "A";
                this.poss.splice(this.poss.length - 1);


            }


        }
        this.stept = false;
    }
    setEventListener(){
        let b = this;
        function sup(event,getIn){
            if (!getIn.stept) {
                switch (event.code) {
                    case "KeyS":
                    case "ArrowDown":
                        if (getIn.dir !== "NORTH") {
                            getIn.dir = "SOUTH";
                            getIn.stept = true;
                        }
                        console.log(objIn);
                        break;
                    case "KeyW":
                    case "ArrowUp":
                        if (getIn.dir !== "SOUTH") {
                            getIn.dir = "NORTH";
                            getIn.stept = true;
                        }
                        console.log(objIn);
                        break;
                    case "KeyA":
                    case "ArrowLeft":
                        if (getIn.dir !== "EAST") {
                            getIn.dir = "WEST";
                            getIn.stept = true;
                        }
                        console.log(objIn);
                        break;
                    case "KeyD":
                    case "ArrowRight":
                        if (getIn.dir !== "WEST") {
                            getIn.dir = "EAST";
                            getIn.stept = true;
                        }
                        console.log(objIn);
                        break;
                }
            }
        }
        window.addEventListener("keydown", function(event) {
            sup(event,b)
        });
    }

    draw(ctx,w,h,field){
        for (let i = 0; i < this.poss.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.dead ? "gray" : (i == 0 ? LightenColor(this.color,-70) : this.color);
            let s = Math.min(w, h);
            ctx.fillRect(this.poss[i].x * (s / field.w), this.poss[i].y * (s / field.h), s / field.w, s / field.h);
            ctx.closePath();
        }
    }
}
//////////////////////////////////////////
// field.js
class Field{
    constructor(w,h){
        /*
        A - air (free space)
        W - wall (wall )
        H - head (Same as )
         */
        this.w = w;
        this.h = h;
        this.area = [];
        for (let i = 0; i < this.h; i++){
            let row = [];
            for (let g = 0; g < this.w; g++){
                row.push((i === 0 || g === 0 || g === this.w - 1 || i === this.h - 1) ? "W" : "A");

            }
            this.area.push(row)
        }
    }
    draw(ctx,w,h){

        for (var i = 0; i < this.h; i++){
            for (var g = 0; g < this.w; g++){
                let color = 'white';
                switch (this.area[i][g]) {
                    case "A":
                        color =  "#E0E0E0";
                        break;
                    case "W":
                        color = "black";
                        break;
                    case "F":
                        color = "yellow";
                        break;

                }
                ctx.beginPath();
                ctx.fillStyle = color;
                let s = Math.min(w,h);
                ctx.fillRect(g*(s/this.h), i*(s/this.w),s/this.h,s/this.w);
                ctx.closePath();
            }
        }



    }
    drawCells(ctx,w,h){
        for (let g = 0; g < this.h; g++) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            let s = Math.min(w, h);
            ctx.moveTo( s/this.h * g, 0);
            ctx.lineTo(s/this.h * g, s );
            ctx.stroke();
            ctx.closePath();
        }
        for (let g = 0; g < this.w; g++) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            let s = Math.min(w, h);
            ctx.moveTo(0, s/this.w * g);
            ctx.lineTo(s,s/this.w * g);
            ctx.stroke();
            ctx.closePath();
        }

    }
    makeWall(x1,y1,x2,y2){
        for (let i = 0; i < y2-y1+1; i++){
            for (let g = 0; g < x2-x1+1; g++){
                console.log(i,g,y1+i,x1+g,y2-y1);
                this.area[y1+i][x1+g] = "W";

            }
        }
    }
}
//////////////////////////////////////////
// index.js
btnFirst = document.getElementById("btnFirst");
secondCont = document.getElementById("secondCont");
btnSecond = document.getElementById("btnSecond");
buttonAndBlur = document.getElementById("buttonAndBlur");
btnFirst.onclick = function(){
    btnFirst.style.display = 'none';
    secondCont.style.display = 'block';
};
btnSecond.onclick = function(){
    buttonAndBlur.style.display = 'none';
    isStoped = true
};



// OUTS:
let youOut = document.getElementById('you');
let stepsOut = document.getElementById('steps');
let aiOut = document.getElementById('ai');


canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;
canvas.setAttribute('width', w);
canvas.setAttribute('height', h);
isStoped = false;
function newGame(whoPlays) {
   if (whoPlays !== "AI"){
    isStoped = false
   }
    aiOut.style.animation = "";
    youOut.style.animation = "";

    field = new Field(41, 41);
    field.makeWall((field.w + 1) / 2 - 5, (field.h + 1) / 2 - 12, (field.w  + 1)/ 2  + 5, (field.h + 1) / 2 - 12); //
    field.makeWall((field.w + 1) / 2 - 5, (field.h + 1) / 2 + 12, (field.w  + 1)/ 2  + 5, (field.h + 1) / 2 + 12);// horizontal walls
    field.makeWall((field.w + 1) / 2 - 12, (field.h + 1) / 2 - 5, (field.w  + 1)/ 2  - 12, (field.h + 1) / 2 + 5); //
    field.makeWall((field.w + 1) / 2 + 12, (field.h + 1) / 2 - 5, (field.w  + 1)/ 2  + 12, (field.h + 1) / 2 + 5);//vertical walls
    snakes = [];

    for (let i = 0; i < 50; i++) {
        food = new Food(field);
    }

    var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


    snakes.push(new Snake(11, 11, [{x: (field.w + 1) / 2 - 5, y: (field.h + 1) / 2 - 10}, {x: (field.w + 1) / 2 - 5, y: (field.h + 1) / 2 - 11}], field, colors[1]));
    let youArrPos = [{x: (field.w + 1) / 2 + 5, y: (field.h + 1) / 2 + 10}, {x: (field.w + 1) / 2 + 5, y: (field.h + 1) / 2 + 11}];
    if (whoPlays === "AI"){
        snakes.push(new Snake(11, 11, youArrPos, field, colors[2]));
    } else {
        var self = new SnakeSelf(youArrPos, field, colors[2]);
        self.setEventListener(self.dirObj);
        snakes.push(self);
    }
    // to fix: Idk why, but when i set same x and diffirent y, its works exactly opposite way, same y and different x;


    let counter = 0;

    function loop() {
        youOut.textContent = snakes[1].poss.length;
        aiOut.textContent = snakes[0].poss.length;
        counter++;
        stepsOut.textContent = counter;

        for (let i = snakes.length - 1; i >=0; i--) {
            snakes[i].makeStep(field);
        }

        ctx.clearRect(0, 0, 9999, 9999);
        w = Math.ceil((window.innerWidth) / this.field.w) * this.field.w;
        h = Math.ceil((window.innerHeight) / this.field.h) * this.field.h;
        canvas.setAttribute('width', Math.min(w, h));
        canvas.setAttribute('height', Math.min(w, h));
        field.draw(ctx, w, h);

        for (let i = 0; i < snakes.length; i++) {
            snakes[i].draw(ctx, w, h, field);
        }
        // field.drawCells(ctx, w, h);
        if (snakes[0].dead || snakes[1].dead || isStoped){
            if (snakes[0].dead){
                aiOut.style.animation = "blink-animation 0.8s steps(5, start) 5"
                window.setTimeout(function () {
                    newGame(whoPlays)
                },4000);
            } else if (isStoped){
                aiOut.style.animation = "blink-animation 0.8s steps(5, start) 3";
                youOut.style.animation = "blink-animation 0.8s steps(5, start) 3";
                window.setTimeout(function () {
                    newGame("SELF")
                },2400);
            }
            else if (snakes[1]){
                youOut.style.animation = "blink-animation 0.8s steps(5, start) 5"
                window.setTimeout(function () {
                    newGame(whoPlays)
                },4000);
            }
        }else{
            window.setTimeout(function () {
                window.requestAnimationFrame(loop);
            }, 75);
        }
    }
    loop();
}
newGame("AI");
canvasCont = document.getElementById("canvasCont");
if (window.innerHeight < window.innerWidth){
    canvasCont.style.width = window.innerHeight/window.innerWidth*100 - 5 + "%";
    canvasCont.style.height = "100%"
}else {
    canvasCont.style.width = "100%";
    canvasCont.style.height = "auto"
}
document.getElementsByTagName("body")[0].onresize = function () {
    if (window.innerHeight < window.innerWidth){
        canvasCont.style.width = window.innerHeight/window.innerWidth*100 - 5 + "%";
        canvasCont.style.height = "100%"
    }else {
        canvasCont.style.width = "100%";
        canvasCont.style.height = "auto"
    }
};