/* 

Name: Daniel Mitchell
File: main.js
Date: Wednesday April 2 2025
Description: Lab 4 Part 4 - Challenge: Adding features to our bouncing balls demo 

*/

/* 1. Setting up the canvas. */

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

/* 2. My function to create a random number between the min and max. */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* 3. The needed function to create the randomized RGB color value. */

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

/* 4. Classifications for the base shapes. */

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

/* 5. Classifications for the balls changing shape. */

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  /* 6. The ball will be drawn on the canvas. */

  draw() {
    if (!this.exists) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  /* 7. The balls placement has been changed and will now bounce off the walls. */

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  /* 8. Check for collisions with other balls and colors change on impact. */

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

/* 9. The keyboard controls the "EvilCircle". */

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = 'white';
    this.size = 10;
    
    /* 10. Created movement controls using event listener. */

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a": this.x -= this.velX; break;
        case "d": this.x += this.velX; break;
        case "w": this.y -= this.velY; break;
        case "s": this.y += this.velY; break;
      }
    });
  }

  /* 11. The "evil circle" path. */

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  /* 12. Makes certain the evil circle will be on the canvas and within its boundaries. */

  checkBounds() {
    if (this.x + this.size > width) this.x = width - this.size;
    if (this.x - this.size < 0) this.x = this.size;
    if (this.y + this.size > height) this.y = height - this.size;
    if (this.y - this.size < 0) this.y = this.size;
  }

  /* 13. If there is a collision with a ball, it will be eaten. */

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.exists = false;
          ballCount--;
          updateBallCount();
        }
      }
    }
  }
}

const balls = [];
let ballCount = 25;
const ballCountDisplay = document.createElement('p');
ballCountDisplay.textContent = `Ball count: ${ballCount}`;
document.body.appendChild(ballCountDisplay);

/* 14. The ball count will get updated and displayed.*/ 

function updateBallCount() {
  ballCountDisplay.textContent = `Ball count: ${ballCount}`;
}

/* 15. Balls get created and added to the array. */

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

/* 16. This is the "EvilCircle" instance .*/

const evilCircle = new EvilCircle(random(0, width), random(0, height));

/* 17. My main animation loop. */

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  /* 18. Draws and updates the balls if they occur. */

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  /* 19. Checks the collisions for the "EvilCircle". */

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  
  requestAnimationFrame(loop);
}

loop();