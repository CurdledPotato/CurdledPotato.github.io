/* 

Name: Daniel Mitchell
File: main.js
Date: Wednesday April 9 2025
Description: Lab 5 Part 1 - Challenge: Accessibility troubleshooting 

*/

// 1. Accessible show or hide comment functionality with enhancements and the elements for the comment wrapper and show or hide button.

const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

// 2. The initial states for accessibility.

commentWrapper.setAttribute('hidden', true);
showHideBtn.setAttribute('aria-expanded', 'false');
showHideBtn.setAttribute('tabindex', '0');