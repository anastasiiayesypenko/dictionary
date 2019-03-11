'use strict'

const leftButton = document.querySelector('.js-dictionary-pages-left');
const rightButton = document.querySelector('.js-dictionary-pages-right');

function onLeftClick() {
    console.log('left')
};
function onLeftClick() {
    console.log('right');
};
leftButton.addEventListener('click', onLeftClick);
rightButton.addEventListener('click', onRightClick);