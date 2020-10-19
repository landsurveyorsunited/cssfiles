/* #############################################################################################################
Matteo Piazza, 2013 
matteopiazza.org/blog
This work is licensed under a Creative Commons Attribution - Share Alike 3.0 - Unported license (CC BY-SA 3.0). 
The text of the license is available at http://creativecommons.org/licenses/by-sa/3.0/
############################################################################################################# */
(function() {
	var microSpaceInvaders = function() {
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// helpers 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// element selector
		var $ = function(selector, el) {  
			if (!el) {el = document;}  
			return el.querySelector(selector);  
		};		
		
		(function() {
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'requestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelrequestAnimationFrame'];
			}
		 
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
		 
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
		})();
		
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// game objects 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!												
		var container = $("#game"); 
		var img, canvas, context, frameCounter, isGameOver, runningAnimation;
		//var spriteSheet = "si_sprite_sheet_bw.png";
		var spriteSheet = "data:image/png;base64,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%3D";					
		
		var sprites = {
			alien_1: 			{	id: "alien_1",										
									width: 32,
									height: 32,
									tiles: [{x: 4, y: 4}, {x: 40, y: 4}]
			},
			alien_2: 			{	id: "alien_2",										
									width: 44,
									height: 32,
									tiles: [{x: 4, y: 40}, {x: 56, y: 40}]
			},
			alien_3:			{	id: "alien_3",										
									width: 48,
									height: 32,
									tiles: [{x: 4, y: 76}, {x: 60, y: 76}]
			},
			flyingSaucer:		{	id: "flyingSaucer",										
									width: 48,
									height: 28,
									tiles: [{x: 4, y: 128}]
			},
			cannon:				{	id: "cannon",
									width: 52,
									height: 32,
									tiles: [{x: 4, y: 160}, {x: 60, y: 160}]
			},
			cannonBullet:		{	id: "cannonBullet",
									width: 4,
									height: 28,
									tiles: [{x: 4, y: 200}]								
			},
			alienBullet:		{	id: "alienBullet",
									width: 12,
									height: 28,
									tiles: [{x: 12, y: 200}]								
			},
			alienExplosion:		{	id: "alienExplosion",
									width: 52,
									height: 28,
									tiles: [{x: 32, y: 200}]								
			},
			saucerExplosion:	{	id: "saucerExplosion",
									width: 52,
									height: 28,
									tiles: [{x: 88, y: 200}]								
			},
			bunkerFull:			{	id: "bunkerFull",
									width: 24,
									height: 24,
									tiles: [{x: 4, y: 232}, {x: 32, y: 232}, {x: 60, y: 232}, {x: 88, y: 232}]								
			},
			bunkerTopLeft:		{	id: "bunkerTopLeft",
									width: 24,
									height: 24,
									tiles: [{x: 4, y: 260}, {x: 32, y: 260}, {x: 60, y: 260}, {x: 88, y: 260}]								
			},
			bunkerTopRight:		{	id: "bunkerTopRight",
									width: 24,
									height: 24,
									tiles: [{x: 4, y: 288}, {x: 32, y: 288}, {x: 60, y: 288}, {x: 88, y: 288}]								
			},
			bunkerBottomLeft:	{	id: "bunkerBottomLeft",
									width: 24,
									height: 24,
									tiles: [{x: 4, y: 316}, {x: 32, y: 316}, {x: 60, y: 316}, {x: 88, y: 316}]								
			},
			bunkerBottomRight:	{	id: "bunkerBottomRight",
									width: 24,
									height: 24,
									tiles: [{x: 4, y: 344}, {x: 32, y: 344}, {x: 60, y: 344}, {x: 88, y: 344}]								
			}
		};					
		
		var sprite = function(e) {
			this.typeOf = "sprite";
			this.sprite = e.sprite;
			this.tileId = 0;
			this.x = e.x;
			this.y = e.y;
		};
		
		var ship = function(e) {
			this.base = new sprite(e);
			for (var i in this.base) {this[i] = this.base[i];}
			
			this.typeOf = "ship";
			this.points = e.points;
			this.state = "alive";							
			
			this.collide = function(o) {
				return (this.state == "alive" && o.y >= this.y && o.y <= this.y+this.sprite.height && o.x >= this.x && o.x <= this.x+this.sprite.width);
			};
			
			this.touchBorder = function() {
				if(aliens.alienSpeedX > 0) {
					var rightX = this.x+aliens.alienSquareWidth+5;
					return ( rightX >= canvas.width );
				} else {
					var leftX = this.x-(aliens.alienSquareWidth-this.sprite.width)/2;
					return ( leftX <= 0 );
				}
			};
			
			this.setSprite = function(sprite) {
				this.sprite = sprite;
			};
			
			this.setState = function(state) {
				this.state = state;
			};
		};
		
		var flyingSaucerShip = function(e) {
			this.base = new ship(e);
			for (var i in this.base) 
			{
				if (i == "base") continue;								
				this[i] = this.base[i];
			}
			
			this.typeOf = "flyingSaucerShip";
		};
		
		var bullet = function(e) {
			this.base = new sprite(e);
			for (var i in this.base) {this[i] = this.base[i];}
			
			this.typeOf = "bullet";
			
			this.collide = function(o) {
				return ( 
					// aliens
					(this.y+this.sprite.height >= o.y && this.y <= o.y && this.x+this.sprite.width >= o.x && this.x <= o.x+o.sprite.width)
					||
					// human
					(o.state == "alive" && this.y <= o.y+o.sprite.height && this.y >= o.y && this.x+this.sprite.width >= o.x && this.x <= o.x+o.sprite.width)
				);
			};
		};
		
		var bunker = function(e) {
			this.typeOf = "bunker";
			this.x = e.x;
			this.y = e.y;
			this.blocks = [	new sprite({sprite: sprites.bunkerTopLeft, x: this.x, y: this.y}),
							new sprite({sprite: sprites.bunkerFull, x: this.x + sprites.bunkerFull.width, y: this.y}),
							new sprite({sprite: sprites.bunkerFull, x: this.x + 2*sprites.bunkerFull.width, y: this.y}),
							new sprite({sprite: sprites.bunkerTopRight, x: this.x + 3*sprites.bunkerFull.width, y: this.y}),
							new sprite({sprite: sprites.bunkerFull, x: this.x, y: this.y + sprites.bunkerFull.height}),
							new sprite({sprite: sprites.bunkerBottomRight, x: this.x + sprites.bunkerFull.width, y: this.y + sprites.bunkerFull.height}),
							new sprite({sprite: sprites.bunkerBottomLeft, x: this.x + 2*sprites.bunkerFull.width, y: this.y + sprites.bunkerFull.height}),
							new sprite({sprite: sprites.bunkerFull, x: this.x + 3*sprites.bunkerFull.width, y: this.y + sprites.bunkerFull.height}),
							new sprite({sprite: sprites.bunkerFull, x: this.x, y: this.y + 2*sprites.bunkerFull.height}),
							new sprite({sprite: sprites.bunkerFull, x: this.x + 3*sprites.bunkerFull.width, y: this.y + 2*sprites.bunkerFull.height}) ];
		};
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// sky background 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!						
		var sky = {
			stars: null,
			starsLayer: 3,
			k_star_number: 30,
			
			init: function() {
				this.stars = [];
				for (var n = 0; n < this.starsLayer; n++) {
					this.stars.push([]);
					// star params: [0]: x, [1]: y, [2]: random starRadius, [3]: random star transparency, [4]: max star radius, [5]: speed 
					for (var i = 0; i < this.k_star_number; i++) {
						this.stars[n].push([Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * (n*2+3), Math.random()/2, (n*2+3), (n*2+3)-2]);
					}
				}
			},
			
			drawStars: function() {
				var star, x, y, radius, alpha, maxRadius, speed;
				for (var n = 0, nl = this.stars.length; n < nl; n++) {
					for (var i = 0, il = this.stars[n].length; i < il; i++) {
						star = this.stars[n][i];
						x = star[0];
						y = star[1];
						radius = star[2];
						alpha = star[3];
						maxRadius = star[4];
						speed = star[5];
						
						// draw
						context.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
						context.beginPath();
						context.arc(x, y, radius, 0, Math.PI * 2, true);
						context.closePath();
						context.fill();
						
						// draw 8 bit
						// square style stars
						/*
						context.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
						context.fillRect(x, y, radius, radius);
						*/
						/*
						// plus style stars
						context.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
						context.lineWidth = 1;
						context.beginPath();
						context.moveTo(x, 				y);
						context.lineTo(x+radius, 		y);				
						context.lineTo(x+radius, 		y+radius);
						context.lineTo(x+(2*radius),	y+radius);
						context.lineTo(x+(2*radius), 	y+(2*radius));
						context.lineTo(x+radius, 		y+(2*radius));
						context.lineTo(x+radius, 		y+(3*radius));				
						context.lineTo(x, 				y+(3*radius));
						context.lineTo(x, 				y+(2*radius));
						context.lineTo(x-radius, 		y+(2*radius));
						context.lineTo(x-radius, 		y+radius);
						context.lineTo(x, 				y+radius);				
						context.lineTo(x, 				y);
						context.fill();	
						*/									
						
						// recreate if out of screen
						if (x - radius < 0) {
							star[0] = canvas.width - radius;
							star[2] = Math.random() * maxRadius;
							star[1] = Math.random() * canvas.height;
							star[3] = Math.random() / 2;
						} 
						// move
						else {
							star[0] -= speed;
						}
					}
				}
			}
		};
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// aliens 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var aliens = {
			flyingSaucer: null, 
			alienBullet: null, 
			flyingSaucerTimer: null, 
			arrAliens: null, 
			alienBorderCollision: null,
			alienBulletSpeed: 10,
			nAlienRows: 5,
			nAliensByRow: 11,
			alienSquareWidth: 60,
			alienSquareHeight: 40,
			alienSpeedX: 10,
			alienSpeedY: 40,
			alienInitialY: 160,
			flyingSaucerInitialY: 100,
			flyingSaucerSpeed: 4,
		
			init: function() {
				this.alienBorderCollision = true;
				this.flyingSaucer = null;
				this.flyingSaucerTimer = new Date().getTime();
				this.alienBullet = null;	
				this.arrAliens = [];
				this.alienSpeedX = 10;
				
				var sprite, points;
				for (var r = 0; r < this.nAlienRows; r++)
				{
					if (r == 0)
					{
						sprite = sprites.alien_1;
						points = 30;
					}
					if (r > 0 && r < 3)
					{
						sprite = sprites.alien_2;
						points = 20;
					}
					if (r > 2 && r < 5)
					{
						sprite = sprites.alien_3;
						points = 10;
					}
					
					for (var a = 0; a < this.nAliensByRow; a++)
					{
						this.arrAliens.push(new ship({	sprite: sprite, 
														x: (a*this.alienSquareWidth)+(this.alienSquareWidth-sprite.width)/2, 
														y: r*this.alienSquareHeight+this.alienInitialY, 
														points: points	}));
					}							
				}
			},
			
			updateAliens: function() {
				var a;
				var upd = {x: 0, y: 0, tile: 1};
				var moveX = this.alienSpeedX;
				var moveY = 0;
				for (var i = 0; i < this.arrAliens.length; i++)
				{								
					a = this.arrAliens[i];
					
					if (a.state == "striked")
					{
						this.arrAliens.splice(i, 1);
						i = 0;
						continue;
					}
					
					// check alien collision with canvas borders
					if (a.touchBorder() && !this.alienBorderCollision)
					{			
						this.alienBorderCollision = !this.alienBorderCollision;
						moveX = 0;
						moveY = this.alienSpeedY;
						this.alienSpeedX *= -1;									
						break;
					}
					
					// check alien collision with player
					if (a.y+a.sprite.height >= human.cannon.y)
						isGameOver = true;
				}
				
				if (moveX != 0)
					this.alienBorderCollision = !this.alienBorderCollision;
				
				upd.x = moveX;
				upd.y = moveY;
				
				return upd;
			},
			
			drawAlienShips: function(upd) {
				var a;
				for (var i = 0; i < this.arrAliens.length; i++)
				{								
					a = this.arrAliens[i];
					if (a.state == "striked")
						a.setSprite(sprites.alienExplosion);
					a.x += upd.x;
					a.y += upd.y;								
					a.tileId += upd.tile; 
					if (a.tileId >= a.sprite.tiles.length)
						a.tileId = 0;
					
					context.drawImage(img, a.sprite.tiles[a.tileId].x, a.sprite.tiles[a.tileId].y, a.sprite.width, a.sprite.height, a.x, a.y, a.sprite.width, a.sprite.height);
				}	
			},
			
			updateFlyingSaucer: function() {
				return (this.flyingSaucer && this.flyingSaucer.state == "striked");
			},
			
			drawFlyingSaucer: function(fs) {
				var time = new Date().getTime();														
				if (!this.flyingSaucer)
				{
					if (time - this.flyingSaucerTimer >= 10000)
					{
						this.flyingSaucer = new flyingSaucerShip({	sprite: sprites.flyingSaucer, 
																	x: canvas.width, 
																	y: this.flyingSaucerInitialY, 
																	points: 100	});
					}
				}
				else
				{
					if (this.flyingSaucer.state == "striked")
						this.flyingSaucer.sprite = sprites.saucerExplosion;
					
					if (this.flyingSaucer.x <= -sprites.flyingSaucer.width || fs)
					{
						this.flyingSaucer = null;
						this.flyingSaucerTimer = time;
					}
					else
					{
						this.flyingSaucer.x -= this.flyingSaucerSpeed;
						context.drawImage(img, this.flyingSaucer.sprite.tiles[0].x, this.flyingSaucer.sprite.tiles[0].y, this.flyingSaucer.sprite.width, this.flyingSaucer.sprite.height, this.flyingSaucer.x, this.flyingSaucer.y, this.flyingSaucer.sprite.width, this.flyingSaucer.sprite.height);
					}
				}
			},
			drawAliens: function() {
				var fs;
				var al = {x: 0, y: 0, tile: 0};
				if (frameCounter == 33)
				{
					al = this.updateAliens();
					fs = this.updateFlyingSaucer(); 
					frameCounter = 0;
				}
				else
				{
					frameCounter++;
				}
				
				this.drawAlienShips(al);							
				this.drawFlyingSaucer(fs);
			},
			
			drawAlienBullet: function() {
				if (this.alienBullet) {
					var bulletOnScreen = true;
					this.alienBullet.y += this.alienBulletSpeed;
					
					// alienBullet outside borders
					if (this.alienBullet.y >= canvas.height)
						bulletOnScreen = false;
					
					// alienBullet hits cannon
					if (bulletOnScreen) {
						if (this.alienBullet.collide(human.cannon))
						{									
							lives.nLives--;
							if (lives.nLives == 0) human.cannon.tileId++;
							bulletOnScreen = false;
						}
					}
					
					// alienBullet hits bunker
					if (bulletOnScreen) {								
						var bk, block;
						for (var i = 0, j = bunkers.arrBunker.length; i < j; i++)
						{
							bk = bunkers.arrBunker[i];
							for (var k = 0, x = bk.blocks.length; k < x; k++)
							{
								block = bk.blocks[k]; 
								if (this.alienBullet.collide(block))
								{									
									block.tileId++;												
									if (block.tileId >= block.sprite.tiles.length)
									{
										bk.blocks.splice(k, 1);
									}												
									bulletOnScreen = false;												
									break;	
								}
							}
						}
					}
					
					// alienBullet on bottom line
					if (bulletOnScreen && this.alienBullet.y+this.alienBullet.sprite.height >= lives.lineY) {
						var strInterrupts = lives.lineInterrupts.join();
						if (strInterrupts.indexOf(this.alienBullet.x.toString()) < 0)
							lives.lineInterrupts.push(this.alienBullet.x);
					}
					// draw or remove bullet
					if (bulletOnScreen)
						context.drawImage(img, this.alienBullet.sprite.tiles[0].x, this.alienBullet.sprite.tiles[0].y, this.alienBullet.sprite.width, this.alienBullet.sprite.height, this.alienBullet.x, this.alienBullet.y, this.alienBullet.sprite.width, this.alienBullet.sprite.height);
					else
						this.alienBullet = null;
				}
				else {
					var alienIdx = Math.floor((this.arrAliens.length+1)*Math.random());
					if (this.arrAliens[alienIdx]) {
						this.alienBullet = new bullet({	sprite: sprites.alienBullet, 
														x: this.arrAliens[alienIdx].x+this.arrAliens[alienIdx].sprite.width/2, 
														y: this.arrAliens[alienIdx].y	});
					}
				}
			}
		};
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// cannon 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var human = {
			cannon: null, 
			cannonBullet: null, 
			moveCannon: null, 
			cannonFire: null,						
			cannonSpeed: 8,						
			cannonBulletSpeed: 10,
			score: 0,
			credit: 0,
			
			init: function() {
				this.moveCannon = "N";
				this.cannonFire = false;
				this.cannonBullet = null;
				this.score = 0;
				
				this.cannon = new ship({	sprite: sprites.cannon, 
											x: (canvas.width/2) - (sprites.cannon.width/2), 
											y: (canvas.height-55) - sprites.cannon.height });
			},
			
			drawCannon: function() {
				if (!isGameOver) {
					switch (this.moveCannon)
					{
						case "L":
							if (this.cannon.x >= 0)
								this.cannon.x += -this.cannonSpeed;
							break;
						case "R":
							if (this.cannon.x <= canvas.width-this.cannon.sprite.width)
								this.cannon.x += this.cannonSpeed;
							break;
						default:
							this.cannon.x += 0;
							break;
					}
				}
				// update for window resizing
				this.cannon.y = (canvas.height-55) - sprites.cannon.height;						
				context.drawImage(img, this.cannon.sprite.tiles[this.cannon.tileId].x, this.cannon.sprite.tiles[this.cannon.tileId].y, this.cannon.sprite.width, this.cannon.sprite.height, this.cannon.x, this.cannon.y, this.cannon.sprite.width, this.cannon.sprite.height);
			},
			
			drawCannonBullet: function() {		
				// cannonBullet exists
				if (this.cannonBullet) {
					var bulletOnScreen = true;							
					this.cannonBullet.y -= this.cannonBulletSpeed;
					
					// collision with canvas upper border
					if (this.cannonBullet.y <= 0)
						bulletOnScreen = false;
					// collision with alien bullet
					if (bulletOnScreen) {
						if (aliens.alienBullet && this.cannonBullet.collide(aliens.alienBullet)) {
							aliens.alienBullet = null;
							bulletOnScreen = false;
						}
					}
					
					// collision with flyingSaucer
					if (bulletOnScreen) {
						if (aliens.flyingSaucer && this.cannonBullet.collide(aliens.flyingSaucer))
						{									
							aliens.flyingSaucer.setState("striked");
							this.score += aliens.flyingSaucer.points;
							bulletOnScreen = false;									
						}
					}
					
					// collision with alien
					if (bulletOnScreen) {								
						var a;
						for (var i = 0; i < aliens.arrAliens.length; i++)
						{
							a = aliens.arrAliens[i];
							if (this.cannonBullet.collide(a))
							{						
								a.setState("striked");
								this.score += a.points;
								bulletOnScreen = false;
								break;
							}
						}
					}
					
					// collision with bunker
					if (bulletOnScreen) {								
						var bk, block;
						for (var i = 0, j = bunkers.arrBunker.length; i < j; i++)
						{
							bk = bunkers.arrBunker[i];
							for (var k = 0, x = bk.blocks.length; k < x; k++)
							{
								block = bk.blocks[k]; 
								if (this.cannonBullet.collide(block))
								{									
									block.tileId++;												
									if (block.tileId >= block.sprite.tiles.length)
									{
										bk.blocks.splice(k, 1);
									}												
									bulletOnScreen = false;
									break;	
								}
							}
						}
					}
					
					// draw or remove bullet
					if (bulletOnScreen)
						context.drawImage(img, this.cannonBullet.sprite.tiles[0].x, this.cannonBullet.sprite.tiles[0].y, this.cannonBullet.sprite.width, this.cannonBullet.sprite.height, this.cannonBullet.x, this.cannonBullet.y, this.cannonBullet.sprite.width, this.cannonBullet.sprite.height);
					else
						this.cannonBullet = null;
				}
				// create bullet
				else if (this.cannonFire)
				{
					if (!isGameOver) {
						this.cannonBullet = new bullet({	sprite: sprites.cannonBullet, 
															x: this.cannon.x+(this.cannon.sprite.width/2)-sprites.cannonBullet.width/2, 
															y: this.cannon.y	});
					}
				}
			}
		};
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// bunkers 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var bunkers = {
			arrBunker: null,
			nBunkers: 4,
			
			init: function() {
				this.arrBunker = [];
				var x, y;
				for (var i = 0; i < this.nBunkers; i++)
				{
					x = (canvas.width / (this.nBunkers*2)) - ((sprites.bunkerFull.width*4) / 2) + (i * (canvas.width / this.nBunkers)); 
					y = (canvas.height-180);
					this.arrBunker.push(new bunker({x: x, y: y}));
				}
			},
			
			drawBunkers: function() {
				var bk, block;
				for (var i = 0, b = this.arrBunker.length; i < b; i++)
				{
					bk = this.arrBunker[i];
					for (var j = 0, t = bk.blocks.length; j < t; j++)
					{
						block = bk.blocks[j];
						context.drawImage(img, block.sprite.tiles[block.tileId].x, block.sprite.tiles[block.tileId].y, block.sprite.width, block.sprite.height, block.x, block.y, block.sprite.width, block.sprite.height);
					}
				}							
			}
		};
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// lives 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var lives = {
			nLives: 3,
			lineY: 0,
			lineHeight: 5,
			lineInterrupts: [],
			lineImageData: null,
			
			init: function() {
				this.nLives = 3;
				this.lineInterrupts = [];
				this.lineImageData = null;
				this.lineY = canvas.height-50;
				var txtArea = new textHelper.textArea({	cls: "field livesField", 
														childs: [textHelper.writeText({cls: "text livesText", id: "livesPlayer1", text: this.nLives})],
														appendTo: container,
														left: "0px",
														bottom: "0px" });
			},
			
			sortInterrupts: function(a, b) {
				return a - b;
			},
			drawLine: function() {
				// draw a line (with interrupts due to alienBullet fall)
				context.fillStyle = "rgba(0,255,0,255)";
				var	rectX = 0,
					rectWidth = canvas.width;
					
				lives.lineInterrupts.sort(this.sortInterrupts);
				for(var i = 0; i < this.lineInterrupts.length; i++) {		
					rectWidth = this.lineInterrupts[i] - rectX;
					context.fillRect(rectX, this.lineY, rectWidth, this.lineHeight);
					rectX = this.lineInterrupts[i]+sprites.alienBullet.width;									
				}
				
				rectWidth = canvas.width - rectX;
				context.fillRect(rectX, this.lineY, rectWidth, this.lineHeight);							
			},
			
			drawLives: function() {
				this.drawLine();
				
				var x, y;
				for (var i = 0; i < this.nLives; i++) {
					y = (canvas.height-sprites.cannon.height-7);
					x = (sprites.cannon.width+i*(sprites.cannon.width*1.5));
					
					c = new ship({	sprite: sprites.cannon, 
									x: (canvas.width/2)-(sprites.cannon.width/2), 
									y: (canvas.height-sprites.cannon.height) });
					
					context.drawImage(img, sprites.cannon.tiles[0].x, sprites.cannon.tiles[0].y, sprites.cannon.width, sprites.cannon.height, x, y, sprites.cannon.width, sprites.cannon.height);
				}
				
				if (!isGameOver)
					textHelper.updateText("#livesPlayer1", this.nLives);
			}
		};
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// text on screen 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var textHelper = {					
			textArea: function(o) {
				this.div = document.createElement("div");
				if (o.id) this.div.id = o.id;
				this.div.className = o.cls;
				this.childs = o.childs;
				this.appendTo = o.appendTo;
				if (o.width) this.div.style.width = o.width + "px";
				
				this.appendTo.appendChild(this.div);
				
				if (this.childs) {
					for (var i=0, j=this.childs.length; i < j; i++)
						this.div.appendChild(this.childs[i]);
				}	
				this.set = function(o) {
					var left, top, right, bottom;		
					if (o.position)
					{
						switch(o.position)
						{
							case "centerBottom":
								left = ( (canvas.width/2) - this.div.offsetWidth/2 ) + "px";
								bottom = 0 + "px";
								break;
							case "centerHV":
								left = ( (canvas.width/2) - this.div.offsetWidth/2 ) + "px";
								top = ( canvas.height/2 - this.div.offsetHeight/2 ) + "px"; 
								break;
							case "centerH":
								left = ( (canvas.width/2) - this.div.offsetWidth/2 ) + "px";
								break;
						}
					}
					if (o.left) left = o.left;
					if (o.top) top = o.top;
					if (o.bottom) bottom = o.bottom;
					if (o.right) right = o.right;
					this.div.style.left = left;
					this.div.style.top = top;
					this.div.style.bottom = bottom;
					this.div.style.right = right;
				};
				
				this.set(o);
				return this;
			},
			
			removeTextArea: function(id) {
				container.removeChild(document.querySelector("#" + id));
			},
			
			writeText: function(o) {
				var p = document.createElement("p");
				p.className = o.cls;
				
				if (o.id) p.id = o.id;
				if (o.text) p.appendChild(document.createTextNode(o.text));						
				if (o.innerhtml) p.innerHTML = o.innerhtml;						
				if (o.onclick) {p.onclick = o.onclick;}		
				
				return p;
			},
			
			// instruction sequence is important in Firefox				
			typewrite: function(str) {
				var p, nChar, d = 2;
				var arrP = document.querySelectorAll(str);
				for (var i = 0; i < arrP.length; i++)
				{					
					p = arrP[i];
					
					p.className += " typewrite ";
					
					nChar = p.textContent.length;
					
					// set @keyframes using CSSOM: "from" and "to" are derived from <p> offsetWidth
					var style = document.documentElement.appendChild(document.createElement("style"));
					var rule =	p.id + "_typing {from {width: 0} to {width: " + nChar + "em}}";	// setting width this way avoids problems due to @fontface loading delay							 
					// WebKit
					if (CSSRule.WEBKIT_KEYFRAMES_RULE) { 
						style.sheet.insertRule("@-webkit-keyframes " + rule, 0);
					}
					// Mozilla
					else if (CSSRule.MOZ_KEYFRAMES_RULE) { 
						style.sheet.insertRule("@-moz-keyframes " + rule, 0);
					}
					// W3C
					else if (CSSRule.KEYFRAMES_RULE) { 
						style.sheet.insertRule("@keyframes " + rule, 0);
					}
					///
					
					// set .end class for animation end
					//rule = "{width: " + nChar + "em;}";
					rule = "{width: auto;}";
					style.sheet.insertRule("#" + p.id + ".end" + rule, 0);
					///
					
					// set animation: steps # is derived from text length inside <p>							
					p.style["animation"] = p.id + "_typing " + d + "s steps(" + nChar + ", end) " + i * d + "s";
					p.style["-webkit-animation"] = p.id + "_typing " + d + "s steps(" + nChar + ", end) " + i * d + "s";
					p.style["MozAnimation"] = p.id + "_typing " + d + "s steps(" + nChar + ", end) " + i * d + "s";
					p.style["-ms-animation"] = p.id + "_typing " + d + "s steps(" + nChar + ", end) " + i * d + "s";
					///
					
					p.className += " startTypewrite ";
					p.addEventListener("animationend", this.typewrite_cb, false);
					p.addEventListener("webkitAnimationEnd", this.typewrite_cb, false);
				}		
				return d*arrP.length;
			},
			
			typewrite_cb: function(e) {
				e.target.className += " end ";
			},
			
			changeTextColor: function(id, color) {
				var p = $(id);
				if (!color) {
					var blocks = "0123456789ABCDEF";
					color = "#";
					for (var i = 0; i < 3; i++) {
						color += blocks.substr(Math.random()*blocks.length, 1);
					}
				}							
				if (p) p.style.color = color;							
			},
			
			updateText: function(id, val, pad) {
				var txt = $(id);
				txt.innerHTML = (pad == null) ? val : textHelper.pad(val, 4, '0', 'L');
			},
			
			removeText: function(id) {
				var txt = $(id);
				if (txt) txt.parentNode.removeChild(txt);
			},
			
			pad: function(str, len, chr, side) {
				var add = '';
				str = str.toString();						
				while (add.length < (len-str.length)) {
					add += chr;
				}
				switch (side)
				{
					case "L":
						str = add + str;
						break;
					case "R":
						str = str + add;
						break;
				}
				return str;
			}
		};
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// game 
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var keyPressed = function(e) {
			if(!e) e = window.event;
			switch (e.keyCode)
			{
				case 37:	// left arrow
					human.moveCannon = (e.type == "keyup") ? "N" : "L"; 
					break;
				case 39:	// right arrow
					human.moveCannon = (e.type == "keyup") ? "N" : "R"; 
					break;
				case 32:	// spacebar									
					human.cannonFire = (e.type == "keyup") ? false : true;
					break;
				case 67:	// 'c'
					if (e.type == "keydown")
						insertCoin();							
					break;
			}
		};
		
		var gameLoop = function() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			sky.drawStars();
			human.drawCannon();
			aliens.drawAliens();
			bunkers.drawBunkers();							
			human.drawCannonBullet();
			aliens.drawAlienBullet();
			
			textHelper.updateText("#scorePlayer1", human.score, true);						
			lives.drawLives();
			
			if (isGameOver) {
				screens.gameOver();
			}
			
			if (lives.nLives == 0) 
				isGameOver = true;
		};
		var setCanvas = function() {
			canvas = document.createElement("canvas");			
			context = canvas.getContext('2d');
			container.appendChild(canvas);
		};
		
		var resizeCanvas = function() {						
			canvas.width = container.offsetWidth;
			canvas.height = container.offsetHeight;
			context.fillRect(0, 0, canvas.width, canvas.height);
		};
		
		var insertCoin = function() {
			human.credit++;
			textHelper.updateText("#credit", textHelper.pad(human.credit, 2, '0', 'L'));
			textHelper.removeText("#insertCoins");
		};
		
		var checkcredit = function(e) {
			// stop event propagation on "play" button
			if (!e) var e = window.event;
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
			
			if (human.credit > 0) {
				human.credit--;
				screens.game();
			}
		};
		
		var _game = function() {
			clearScreen();						
			
			img = new Image();
			img.onload = function() {					
				// init game objects
				setCanvas();
				resizeCanvas();
				frameCounter = 0;
				isGameOver = false;
				sky.init();
				lives.init();
				human.init();
				aliens.init();
				bunkers.init();
				// score
				var txtArea = new textHelper.textArea({	cls: "field scoreField", 
														childs: [	
															textHelper.writeText({cls: "text scoreText", text: "score <1>"}),
															textHelper.writeText({cls: "text scoreText", id: "scorePlayer1", text: textHelper.pad(human.score, 4, '0', 'L')}) 
														],
														appendTo: container,
														left: "0px",
														top: "0px" });							
				// credit
				txtArea = new textHelper.textArea({	cls: "field", 
													childs: [
														textHelper.writeText({cls: "text creditText", innerhtml: "credit <span id='credit'>" + textHelper.pad(human.credit, 2, '0', 'L') + "</span>"})
													],
													appendTo: container,
													right: "0px",
													bottom: "0px" });	
				
				// animation loop
				var gameWrapper = container;
				//var startTime = window.performance.now() ||  window.mozAnimationStartTime || +new Date;
				//startTime = (window.performance && window.performance.now) ? performance.now() : (window.mozAnimationStartTime ? window.mozAnimationStartTime : +new Date());
				
				//requestAnimationFrame(loop, gameWrapper);
				(function loop(timestamp) {
					// time since last draw
					//var drawStart = (timestamp || +new Date);
					//var diff = drawStart - startTime;
					// update frame rate
					//if (diff > 1000/33) 
					//{
						// animation
						gameLoop();
						
						// reset startTime
						//startTime = drawStart;
					//}
					
					runningAnimation = requestAnimationFrame(loop, gameWrapper);
				})();
			}
			
			img.src = spriteSheet;
		}
		
		var _intro = function() {
			clearScreen();
			setCanvas();
			resizeCanvas();
			sky.init();						
			
			// game menu
			var txtArea = new textHelper.textArea({	
				cls: "field", 
				childs: [	
					textHelper.writeText({
						id: "play", 
						cls: "text clickText menuText", 
						innerhtml: "pla<span id='span_container'><span id='span_y'>y</span><span id='span_img'></span></span>", 
						onclick: checkcredit
					}),
					textHelper.writeText({
						id: "SpaceInvadersText", 
						cls: "text", 
						text: "space invaders"
					}),																			
					textHelper.writeText({
						id: "insertCoins", 
						cls: "text clickText insertCoins", 
						text: "insert coin(s)", 
						onclick: insertCoin
					})
				],
				appendTo: container,
				width: canvas.width,
				position: "centerH",
				top: "20%" 
			});
													
			// score advance
			txtArea = new textHelper.textArea({	
				cls: "field scoreAdvanceTableField", 
				childs: [	
					textHelper.writeText({cls: "text scoreAdvanceText", text: "*score advance table*"}),
					textHelper.writeText({
						innerhtml:	"<ul id='scoreAdvanceTable'>" +
									"<li><span><span id='span_score_mystery'></span></span><p id='score_mystery' class='text scoreAdvanceText'>= ? mystery</p></li>" +
									"<li><span><span id='span_score_30'></span></span><p id='score_30' class='text scoreAdvanceText'>= 30 points</p></li>" +
									"<li><span><span id='span_score_20'></span></span><p id='score_20' class='text scoreAdvanceText'>= 20 points</p></li>" +
									"<li><span><span id='span_score_10'></span></span><p id='score_10' class='text scoreAdvanceText'>= 10 points</p></li>" +
									"</ul>"
						})	
				],
				appendTo: container,
				width: 450,
				position: "centerH",
				top: "50%" 
			});
													
			// credit
			txtArea = new textHelper.textArea({	
				cls: "field", 
				childs: [
					textHelper.writeText({cls: "text creditText", innerhtml: "credit <span id='credit'>" + textHelper.pad(human.credit, 2, '0', 'L') + "</span>"})
				],
				appendTo: container,
				right: "0px",
				bottom: "0px" 
			});
			// copyright
			txtArea = new textHelper.textArea({	
				cls: "field", 
				childs: [	
					textHelper.writeText({id: "instructionsLink", cls: "text clickText smallText", text: "instructions", onclick: screens.instructions}),
					textHelper.writeText({id: "copyright", cls: "text smallText", innerhtml: "[ <a href='http://www.matteopiazza.org/blog/post/2012/03/28/Space-Invaders-HTML5-porting.aspx'>JH5 binary arts</a> ]"})
				],
				appendTo: container,
				width: 400,
				position: "centerBottom" 
			});															
				
			// typewriting animation
			// set score advance table background images
			$("#span_score_mystery").style["background"] = "url('" + spriteSheet + "') -4px -122px no-repeat";
			$("#span_score_30").style["background"] = "url('" + spriteSheet + "') -4px -4px no-repeat";
			$("#span_score_20").style["background"] = "url('" + spriteSheet + "') -4px -40px no-repeat";
			$("#span_score_10").style["background"] = "url('" + spriteSheet + "') -4px -76px no-repeat";
			// start typewriting
			var t = textHelper.typewrite("#score_mystery, #score_10, #score_20, #score_30");
			
			/// "play" and alien intro animation						
			var setEventListener = function(id, ev, cb) {
				var el = $(id); 
				switch (ev)
				{
					case "transitionend":
						el.addEventListener("transitionend", cb, false);		// firefox
						el.addEventListener("webkitTransitionEnd", cb, false);	// chrome/safari
						el.addEventListener("oTransitionEnd", cb, false);		// opera
						el.addEventListener("MSTransitionEnd", cb, false);		// IE
						break;
				}
			};				
		
			var animatePlay = function() {
				var span_container = $("#span_container");
				var span_img = $("#span_img");
				var span_y = $("#span_y");
				var rightEdge = container.offsetWidth/2 + aliens.alienSquareWidth + "px";								
				span_img.style["background-image"] = "url('" + spriteSheet + "')";
				// animation callback
				var animate = function(e) {
					switch (e.target.id) {
						case "span_img":
							if (e.propertyName == "left")
								span_container.style["left"] = rightEdge;
							break;
						case "span_container":
							if ($("#span_y.end") != null) 
								span_img.className = "end";
								
							if ($("#span_img.end") != null)
								span_img.style["opacity"] = "0";
							span_container.style["left"] = "0";
							span_y.className = "end";
							break;
					}
				};	
				
				// eventhandlers
				setEventListener("#span_img", "transitionend", animate);
				setEventListener("#span_container", "transitionend", animate);
				
				// start animation
				span_img.style["left"] = rightEdge;	// set image position on window right border				
				
				setTimeout(function(){
					span_img.className = "slide";	// set transition/animation properties
					span_img.style["left"] = "0";	// start transition
				}, t);
			}();						
			///
			
			// animation loop
			var gameWrapper = container;
			//var startTime = window.performance.now() ||  window.mozAnimationStartTime || +new Date;
			//startTime = (window.performance && window.performance.now) ? performance.now() : (window.mozAnimationStartTime ? window.mozAnimationStartTime : +new Date());
			
			//requestAnimationFrame(loop, gameWrapper);
			(function loop(timestamp) {
				
				// time since last draw
				//var drawStart = (timestamp || +new Date);
				//var diff = drawStart - startTime;
				// update frame rate
				//if (diff > 1000/30) 
				//{
					// animation
					context.clearRect(0, 0, canvas.width, canvas.height);							
					sky.drawStars();
					textHelper.changeTextColor("#insertCoins");
					if (human.credit > 0) textHelper.changeTextColor("#play"); 
					
					// reset startTime
					//startTime = drawStart;
				//}
				runningAnimation = requestAnimationFrame(loop, gameWrapper);
			})();
		};
		
		var _instructions = function() {
			// instructions splash screen
			var txtArea = new textHelper.textArea({	
				id: "divInstructions",
				cls: "field instructionsFieldFrame", 
				childs: [	
					textHelper.writeText({
						cls: "text instructionsText", 
						innerhtml: 	"<ol>" +
									"<li>press 'c' or click 'insert coin(s)'</li>" +
									"<li>press 'play' to start game</li>" +
									"<li>left/right keys to move cannon</li>" +
									"<li>'spacebar' to shot</li>" +
									"</ol>"
					}),							
					textHelper.writeText({cls: "text clickText menuText", text: "close", onclick: function(){textHelper.removeTextArea("divInstructions");}}) ],
				appendTo: container,
				position: "centerHV" 
			});
		};
		
		var _gameOver = function() {
			// game over splash screen
			if (!$("#divGameOver")) {
				var txtArea = new textHelper.textArea({	
					id: "divGameOver",
					cls: "field menuFieldFrame", 
					childs: [	
						textHelper.writeText({cls: "text menuHeaderText", text: "game over"}),
						textHelper.writeText({cls: "text clickText menuText", text: "play again", onclick: checkcredit}) 
					],
					appendTo: container,
					position: "centerHV" 
				});
			}
		};
		
		var clearScreen = function() {
			while (container.hasChildNodes())
				container.removeChild(container.lastChild);
		};
		
		var screens = {
			intro: function() {
				_intro();
			},
			instructions: function() {
				_instructions();
			},
			game: function() {
				cancelAnimationFrame(runningAnimation);
				_game();
			},
			gameOver: function() {
				cancelAnimationFrame(runningAnimation);
				_gameOver();
			}
		};
		
		var initGame = function() {
			human.credit = 0;
			screens.intro();
		};
		
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// start game
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!					
		// event handlers
		window.addEventListener("keydown", keyPressed, true);
		window.addEventListener("keyup", keyPressed, true);
		window.addEventListener("resize", resizeCanvas, true);
		
		initGame();
		
	};
	document.onreadystatechange = function() {
		if (document.readyState === "complete") {
			microSpaceInvaders();
		}
	};
})();
