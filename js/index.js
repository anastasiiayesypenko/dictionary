'use strict'

const leftButton = document.querySelector('.js-dictionary-pages-left');
const rightButton = document.querySelector('.js-dictionary-pages-right');
let dictionaryImage = document.querySelector('.dictionary-pages-image');


let dictionarySources = ['./img/page1.jpg', './img/page2.jpg', './img/page3.jpg', './img/page4.jpg', './img/page5.jpg'];
document.addEventListener("DOMContentLoaded", onLoaded);
function onLoaded() {
    dictionaryImage.setAttribute('src', dictionarySources[0]);

    function onLeftClick() {
        dictionaryImage.removeAttribute('src');
        dictionaryImage.setAttribute('src', dictionarySources[1]);
    };
    function onRightClick() {
        dictionaryImage.removeAttribute('src');
        dictionaryImage.setAttribute('src', dictionarySources[0]);
    };
    leftButton.addEventListener('click', onLeftClick);
    rightButton.addEventListener('click', onRightClick);
}
