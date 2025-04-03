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

