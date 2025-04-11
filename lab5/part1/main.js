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

// 3. Added the function to toggle for comment visibility, the ability to hide the accessibility update information.

function toggleComments() {
  const isVisible = !commentWrapper.hasAttribute('hidden');
  if (isVisible) {
    commentWrapper.setAttribute('hidden', true);
    showHideBtn.textContent = 'Show comments';
    showHideBtn.setAttribute('aria-expanded', 'false');
  } else {
    commentWrapper.removeAttribute('hidden');
    showHideBtn.textContent = 'Hide comments';
    showHideBtn.setAttribute('aria-expanded', 'true');
  }
}

// 4. Comments can now be toggled using the mouse to point and click while the keyboard can be accessed using enter or spacebar.

showHideBtn.addEventListener('click', toggleComments);
showHideBtn.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleComments();
  }
});

// 5. The form functionality for comments with validation and the enhanced screen reader.

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

// 6. The event listener for the submission of the attach form.

form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

// 7. The submit & display function for comments.

function submitComment() {
  const nameValue = nameField.value.trim();
  const commentValue = commentField.value.trim();

  if (!nameValue || !commentValue) { // 8. The validation to make sure that both fields are filled.
    alert('Please fill in both your name and your comment.');
    return;
  }

  const listItem = document.createElement('li'); // 9. For the creation of a new list item & paragraphs for comments.
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');

  namePara.textContent = nameValue; // 10. Elements will have their text content assigned and aria-live will provide new comments to the readers.
  commentPara.textContent = commentValue;
  commentPara.setAttribute('aria-live', 'polite');

  listItem.appendChild(namePara); // 11. A new comment will append to the list.
  listItem.appendChild(commentPara);
  list.appendChild(listItem);

  nameField.value = ''; // 12. The fields will be reset.
  commentField.value = '';
  nameField.focus();
}
