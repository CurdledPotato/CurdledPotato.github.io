/* 

Name: Daniel Mitchell
File: main.js
Date: Wednesday April 2 2025
Description: Lab 4 Part 2 - Challenge: Image Gallery

*/

/* 1. Selecting the elements for the Image gallery */

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 2. Declaring the array of image filenames */

const imageFiles = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* 3. Declaring the alternative text for each image file */

const altText = {
    
    'pic1.jpg': 'Closeup of a blue human eye',
    'pic2.jpg': 'Rock formations on a beach',
    'pic3.jpg': 'Purple flowers in a field',
    'pic4.jpg': 'Ancient building with pillars',
    'pic5.jpg': 'River with mountains in the background'
};

/* 4. Looping through images */

imageFiles.forEach(image => {

    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', altText[image]);
    thumbBar.appendChild(newImage);

/* 5. Adding click event listener to each thumbnail image */

    newImage.addEventListener('click', () => {
        
        displayedImage.setAttribute('src', newImage.getAttribute('src'));
        displayedImage.setAttribute('alt', newImage.getAttribute('alt'));
    });
});

/* 6. Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {

    if (btn.getAttribute('class') === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
});
