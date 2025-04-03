/* 

Name: Daniel Mitchell
File: main.js
Date: Wednesday April 2 2025
Description: Lab 4 Part 3 - Object building practice: LET'S BOUNCE SOME BALLS!!! 

*/

/* 1. Choosing the canvas and set up. */

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/* 2. Setting the dimensions of the canvas. */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;

/* 3. Remaking the needed functions. */

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomRGB = () => `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

/* 4. Defining the ball classifications.  */

class Ball {
  constructor(x, y, velX, velY, color, size) {
    Object.assign(this, { x, y, velX, velY, color, size });
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

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

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          this.color = ball.color = randomRGB();
        }
      }
    }
  }
}

