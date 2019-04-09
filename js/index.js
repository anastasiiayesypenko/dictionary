'use strict'

const leftButton = document.querySelector('.js-dictionary-pages-left');
const rightButton = document.querySelector('.js-dictionary-pages-right');
let dictionaryImage = document.querySelector('.dictionary-pages-image');
const toTopLink = document.querySelector('.toTop-link');
const abbreviationTemplate = document.querySelector('#abbreviation-template');
const abbreviationTable = document.querySelector('.template-table-abbreviation');
const prefaceTable = document.querySelector('.template-table-preface');
const prefaceTemplate = document.querySelector('#preface-template');
const sourseTable = document.querySelector('.template-table-sourse');
const sourseTemplate = document.querySelector('#sourse-template');
const sixthZoneTemplate = document.querySelector('#sixthZoneTemplate');
const sixthZoneTable = document.querySelector('.template-table-sixZone');
const seventhZoneTemplate = document.querySelector('#seventhZoneTemplate');
const seventhZoneTable = document.querySelector('.template-table-seventhZone');
const gramCodesTemplate = document.querySelector('#gramCodesTemplate');
const gramCodesTable = document.querySelector('.template-table-gramCodes');
const lsvZoneTemplate = document.querySelector('#lsvZoneTemplate');
const lsvZoneTable = document.querySelector('.template-table-lsvZone');



let dictionarySources = ['./img/page1.jpg', './img/page2.jpg', './img/page3.jpg', './img/page4.jpg', './img/page5.jpg', './img/page6.jpg', './img/page7.jpg'];
dictionaryImage.setAttribute('src', dictionarySources[0]);



document.addEventListener("DOMContentLoaded", onLoaded);
function onLoaded() {
    let currentSource = dictionaryImage.getAttribute('src');
    leftButton.disabled = true;
    function onLeftClick() {
        rightButton.disabled = false;
        currentSource = dictionaryImage.getAttribute('src');
        let indexOfImage = dictionarySources.indexOf(currentSource);
        console.log(indexOfImage);
        dictionaryImage.removeAttribute('src');
        if (indexOfImage >= 2) {
            dictionaryImage.setAttribute('src', dictionarySources[indexOfImage-=1]) 
        } else {
            leftButton.disabled = true;
            dictionaryImage.setAttribute('src', dictionarySources[0]);
        };
    };
    function onRightClick() {
        leftButton.disabled = false;
        currentSource = dictionaryImage.getAttribute('src');
        let indexOfImage = dictionarySources.indexOf(currentSource);
        console.log(indexOfImage);
        dictionaryImage.removeAttribute('src');
        if (indexOfImage <= 4) {
            dictionaryImage.setAttribute('src', dictionarySources[indexOfImage+=1]);
        } else {
            rightButton.disabled = true;
            dictionaryImage.setAttribute('src', dictionarySources[6]);    
        }

    };
    leftButton.addEventListener('click', onLeftClick);
    rightButton.addEventListener('click', onRightClick);
    

    toTopLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    const body = document.querySelector('body');
    body.addEventListener("click", function(event) {
        const target = event.target;
        event.preventDefault();
        if (target.nodeName === "A") {
            const href = target.getAttribute("href");
            if (href) {
                const el = document.querySelector(href);
                const path =
                  el.getBoundingClientRect().top + window.pageYOffset;
              
                window.scrollTo({ top: path, behavior: "smooth" });
            } else return;
        }
      });
    


    let preface = fetch("https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/preface.json")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error while fetching: ${response.statusText}`)
        })
        .then(data => {
            let source = prefaceTemplate.innerHTML.trim();
            let func = Handlebars.compile(source);
            let result = '';
            for (let item of data) {
                let markup = func(item);
                result += markup;                
            };
            prefaceTable.innerHTML = result;
        })
        .catch(error => console.log(error));
    


    let abbreviations = fetch("https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/abbreviations.json")
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error while fetching: ${response.statusText}`)
        })
        .then(data => {
            let source = abbreviationTemplate.innerHTML.trim();
            let func = Handlebars.compile(source);
            let result = '';
            for (let item of data) {
                let markup = func(item);
                result += markup;                
            };
            abbreviationTable.insertAdjacentHTML('beforeend', result);
        })
        .catch(error => console.log(error));


    let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/exampleSourse.json')
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
        let source = sourseTemplate.innerHTML.trim();
        let func = Handlebars.compile(source);
        let result = '';
        for (let item of data) {
            let markup = func(item);
            result += markup;                
        };
        sourseTable.insertAdjacentHTML('beforeend', result);
    })
    .catch(error => console.log(error));



    let sixthZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/corpus6zone.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(data => {
            let source = sixthZoneTemplate.innerHTML.trim();
            let func = Handlebars.compile(source);
            let result = '';
            for (let item of data) {
                let markup = func(item);
                result += markup;                
            };
            sixthZoneTable.insertAdjacentHTML('beforeend', result);
        })
        .catch(error => console.log(error));



    let seventhZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/corpus7zone.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(data => {
            let source = seventhZoneTemplate.innerHTML.trim();
            let func = Handlebars.compile(source);
            let result = '';
            for (let item of data) {
                let markup = func(item);
                result += markup;                
            };
            seventhZoneTable.insertAdjacentHTML('beforeend', result);
        })
        .catch(error => console.log(error));



    let gramCodes = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/gramCodes.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(data => {
            let source = gramCodesTemplate.innerHTML.trim();
            let func = Handlebars.compile(source);
            let result = '';
            for (let item of data) {
                let markup = func(item);
                result += markup;                
            };
            gramCodesTable.insertAdjacentHTML('beforeend', result);
        })
        .catch(error => console.log(error));



    let lsvZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/lsvZone.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(data => {
            let source = lsvZoneTemplate.innerHTML.trim();
            let func = Handlebars.compile(source);
            let result = '';
            for (let item of data) {
                let markup = func(item);
                result += markup;                
            };
            lsvZoneTable.insertAdjacentHTML('beforeend', result);
        })
        .catch(error => console.log(error));
}
