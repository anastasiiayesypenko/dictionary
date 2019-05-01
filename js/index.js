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
let wordButton;



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
    

    // toTopLink.addEventListener('click', function(event) {
    //     event.prevenpefault();
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // });


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



    // let sixthZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/corpus6zone.json')
  
    // let seventhZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/corpus7zone.json')

    function findExample(buttonID) {
        let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/exampleSourse.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(example => {
            let arr = example.some(id => {
                Number(id.id_head_slovospoluka) === Number(buttonID);
                console.log(id.id_head_slovospoluka);
                console.log(buttonID);
            });
            console.log(arr);
        })
    };


    let gramCodes = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_arsun/master/bd/zone.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(data => {
            for (let item of data) {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                tr.classList.add('hidden');
                td.classList.add('hidden');

                let tableRow = document.createElement('tr');
                let tableRowMainWord = document.createElement('td');
                tableRowMainWord.classList.add('table-cell', 'table-row-main-word');
                let buttonWord = document.createElement('button');
                buttonWord.classList.add('main-word-button');
                buttonWord.textContent = `${item.id}. ${item.СЛОВО}`;
                buttonWord.dataset.id = item.id;



                buttonWord.addEventListener('click', function(event) {
                    tr.classList.toggle('hidden');
                    td.classList.toggle('hidden');
                    let buttonID = event.target.dataset.id;
                    findExample(event.target.dataset.id);
                    if (!(tr.classList.contains('hidden'))) {

                        let lsvZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/lsvZone.json')
                        .then(response => {
                            if (response.ok) return response.json();
                            console.log(response.json());
                            throw new Error(response.statusText);
                        })
                        .then(inf => {
                            let idList = [];
                            let lsvIDlist = [];
                            for (let id of inf) {
                                lsvIDlist.push(id.id);
                            }
                            let iList = inf.map(i => {
                                console.log('id', i.id);

                                if (Number(i.id) === Number(buttonID)) {
                                    if (!(idList.includes(buttonID))) {
                                        idList.push(buttonID);
                                        console.log('Number(buttonID) === Number(i.id), !(idList.includes(buttonID)');
                                        tr.innerHTML = '';
                                        td.innerHTML = '';
                                        let paragraph = document.createElement('p');
                                        paragraph.textContent = `${i.id}`;
                                        paragraph.style.height = '40px';
                                        td.classList.add('table-cell--info');
                                        let firstZoneTitle = document.createElement('h3');
                                        firstZoneTitle.classList.add('table__info-title');
                                        firstZoneTitle.textContent = `Перша зона:`;
                                        let firstZoneParagraph = document.createElement('p');
                                        firstZoneParagraph.textContent = `${ item.Зона_1 }`;
                                        firstZoneParagraph.classList.add('table__paragraph');
                                        let secondZoneTitle = document.createElement('h3');
                                        secondZoneTitle.classList.add('table__info-title');
                                        secondZoneTitle.textContent = `Друга зона:`;
                                        let secondZoneParagraph = document.createElement('p');
                                        secondZoneParagraph.textContent = `${ item.Зона_2 }`;
                                        secondZoneParagraph.classList.add('table__paragraph');

                                        let thirdZoneTitle = document.createElement('h3');
                                        thirdZoneTitle.classList.add('table__info-title');
                                        thirdZoneTitle.textContent = `Третя зона:`;
                                        let thirdZoneParagraph = document.createElement('p');
                                        thirdZoneParagraph.textContent = `${ item.Зона_3 }`;
                                        thirdZoneParagraph.classList.add('table__paragraph');
                                        let fourthZoneTitle = document.createElement('h3');
                                        fourthZoneTitle.classList.add('table__info-title');
                                        fourthZoneTitle.textContent = `Четверта зона:`;
                                        let fourthZoneParagraph = document.createElement('p');
                                        fourthZoneParagraph.textContent = `${ item.Зона_4 }`;
                                        fourthZoneParagraph.classList.add('table__paragraph');

                                        let fifthZoneTitle = document.createElement('h3');
                                        fifthZoneTitle.classList.add('table__info-title');
                                        fifthZoneTitle.textContent = `П'ята зона:`;
                                        let fifthZoneParagraph = document.createElement('p');
                                        fifthZoneParagraph.textContent = `${ item.Зона_5 }`;
                                        fifthZoneParagraph.classList.add('table__paragraph');
                                        let sixthZoneTitle = document.createElement('h3');
                                        sixthZoneTitle.classList.add('table__info-title');
                                        sixthZoneTitle.textContent = `Шоста зона:`;
                                        let sixthZoneParagraph = document.createElement('p');
                                        sixthZoneParagraph.textContent = `${ item.Зона_6 }`;
                                        sixthZoneParagraph.classList.add('table__paragraph');
                                        let seventhZoneTitle = document.createElement('h3');
                                        seventhZoneTitle.classList.add('table__info-title');
                                        seventhZoneTitle.textContent = `Сьома зона:`;
                                        let seventhZoneParagraph = document.createElement('p');
                                        seventhZoneParagraph.textContent = `${ item.Зона_7 }`;
                                        seventhZoneParagraph.classList.add('table__paragraph');

                                        tr.classList.add('table__info-tr');
                                        let lsvThirdZoneTitle = document.createElement('h3');
                                        lsvThirdZoneTitle.classList.add('table__info-title');
                                        lsvThirdZoneTitle.textContent = `Третя зона ЛСВ:`;
                                        let lsvThirdZoneParagraph = document.createElement('p');
                                        lsvThirdZoneParagraph.textContent = `${ i.Зона_3_ЛСВ }`;
                                        lsvThirdZoneParagraph.classList.add('table__paragraph');
                                        let lsvFourthZoneTitle = document.createElement('h3');
                                        lsvFourthZoneTitle.classList.add('table__info-title');
                                        lsvFourthZoneTitle.textContent = `Четверта зона ЛСВ:`;
                                        let lsvFourthZoneParagraph = document.createElement('p');
                                        lsvFourthZoneParagraph.textContent = `${ i.Зона_4_ЛСВ }`;
                                        lsvFourthZoneParagraph.classList.add('table__paragraph');

                                        let lsvfifthZoneTitle = document.createElement('h3');
                                        lsvfifthZoneTitle.classList.add('table__info-title');
                                        lsvfifthZoneTitle.textContent = `П'ята зона ЛСВ:`;
                                        let lsvfifthZoneParagraph = document.createElement('p');
                                        lsvfifthZoneParagraph.textContent = `${ i.Зона_5_ЛСВ }`;
                                        lsvfifthZoneParagraph.classList.add('table__paragraph');
                                        let lsvsixthZoneTitle = document.createElement('h3');
                                        lsvsixthZoneTitle.classList.add('table__info-title');
                                        lsvsixthZoneTitle.textContent = `Шоста зона ЛСВ:`;
                                        let lsvsixthZoneParagraph = document.createElement('p');
                                        lsvsixthZoneParagraph.textContent = `${ i.Зона_6_ЛСВ }`;
                                        lsvsixthZoneParagraph.classList.add('table__paragraph');
                                        let lsvseventhZoneTitle = document.createElement('h3');
                                        lsvseventhZoneTitle.classList.add('table__info-title');
                                        lsvseventhZoneTitle.textContent = `Сьома зона ЛСВ:`;
                                        let lsvseventhZoneParagraph = document.createElement('p');
                                        lsvseventhZoneParagraph.textContent = `${ i.Зона_7_ЛСВ }`;
                                        lsvseventhZoneParagraph.classList.add('table__paragraph');



                                        td.append(paragraph, firstZoneTitle, firstZoneParagraph, secondZoneTitle, secondZoneParagraph,
                                            thirdZoneTitle, thirdZoneParagraph, fourthZoneTitle, fourthZoneParagraph, fifthZoneTitle, fifthZoneParagraph, 
                                            sixthZoneTitle, sixthZoneParagraph, seventhZoneTitle, secondZoneParagraph);
                                        tr.append(lsvThirdZoneTitle, lsvThirdZoneParagraph, lsvFourthZoneTitle, lsvFourthZoneParagraph, lsvfifthZoneTitle, lsvfifthZoneParagraph, lsvsixthZoneTitle, lsvsixthZoneParagraph, lsvseventhZoneTitle, lsvseventhZoneParagraph);
                                        tableRow.append(td, tr);
                                    } else {
                                        console.log('Number(buttonID) === Number(i.id), idList.includes(buttonID)');
                                        tr.classList.add('table__info-tr');
                                        let lsvThirdZoneTitle = document.createElement('h3');
                                        lsvThirdZoneTitle.classList.add('table__info-title');
                                        lsvThirdZoneTitle.textContent = `Третя зона ЛСВ:`;
                                        let lsvThirdZoneParagraph = document.createElement('p');
                                        lsvThirdZoneParagraph.textContent = `${ i.Зона_3_ЛСВ }`;
                                        lsvThirdZoneParagraph.classList.add('table__paragraph');
                                        let lsvFourthZoneTitle = document.createElement('h3');
                                        lsvFourthZoneTitle.classList.add('table__info-title');
                                        lsvFourthZoneTitle.textContent = `Четверта зона ЛСВ:`;
                                        let lsvFourthZoneParagraph = document.createElement('p');
                                        lsvFourthZoneParagraph.textContent = `${ i.Зона_4_ЛСВ }`;
                                        lsvFourthZoneParagraph.classList.add('table__paragraph');

                                        let lsvfifthZoneTitle = document.createElement('h3');
                                        lsvfifthZoneTitle.classList.add('table__info-title');
                                        lsvfifthZoneTitle.textContent = `П'ята зона ЛСВ:`;
                                        let lsvfifthZoneParagraph = document.createElement('p');
                                        lsvfifthZoneParagraph.textContent = `${ i.Зона_5_ЛСВ }`;
                                        lsvfifthZoneParagraph.classList.add('table__paragraph');
                                        let lsvsixthZoneTitle = document.createElement('h3');
                                        lsvsixthZoneTitle.classList.add('table__info-title');
                                        lsvsixthZoneTitle.textContent = `Шоста зона ЛСВ:`;
                                        let lsvsixthZoneParagraph = document.createElement('p');
                                        lsvsixthZoneParagraph.textContent = `${ i.Зона_6_ЛСВ }`;
                                        lsvsixthZoneParagraph.classList.add('table__paragraph');
                                        let lsvseventhZoneTitle = document.createElement('h3');
                                        lsvseventhZoneTitle.classList.add('table__info-title');
                                        lsvseventhZoneTitle.textContent = `Сьома зона ЛСВ:`;
                                        let lsvseventhZoneParagraph = document.createElement('p');
                                        lsvseventhZoneParagraph.textContent = `${ i.Зона_7_ЛСВ }`;
                                        lsvseventhZoneParagraph.classList.add('table__paragraph');
                                        tr.append(lsvThirdZoneTitle, lsvThirdZoneParagraph, lsvFourthZoneTitle, lsvFourthZoneParagraph, lsvfifthZoneTitle, lsvfifthZoneParagraph, lsvsixthZoneTitle, lsvsixthZoneParagraph, lsvseventhZoneTitle, lsvseventhZoneParagraph);
                                        tableRow.append(td, tr);
                                    }
                                
                                } else if (!(lsvIDlist.includes(Number(buttonID)))) {
                                    console.log(lsvIDlist, Number(buttonID));
                                    td.classList.add('table-cell--info');
                                        td.innerHTML = '';
                                        tr.innerHTML = '';
                                        let firstZoneTitle = document.createElement('h3');
                                        firstZoneTitle.classList.add('table__info-title');
                                        firstZoneTitle.textContent = `Перша зона:`;
                                        let firstZoneParagraph = document.createElement('p');
                                        firstZoneParagraph.textContent = `${ item.Зона_1 }`;
                                        firstZoneParagraph.classList.add('table__paragraph');
                                        let secondZoneTitle = document.createElement('h3');
                                        secondZoneTitle.classList.add('table__info-title');
                                        secondZoneTitle.textContent = `Друга зона:`;
                                        let secondZoneParagraph = document.createElement('p');
                                        secondZoneParagraph.textContent = `${ item.Зона_2 }`;
                                        secondZoneParagraph.classList.add('table__paragraph');

                                        let thirdZoneTitle = document.createElement('h3');
                                        thirdZoneTitle.classList.add('table__info-title');
                                        thirdZoneTitle.textContent = `Третя зона:`;
                                        let thirdZoneParagraph = document.createElement('p');
                                        thirdZoneParagraph.textContent = `${ item.Зона_3 }`;
                                        thirdZoneParagraph.classList.add('table__paragraph');
                                        let fourthZoneTitle = document.createElement('h3');
                                        fourthZoneTitle.classList.add('table__info-title');
                                        fourthZoneTitle.textContent = `Четверта зона:`;
                                        let fourthZoneParagraph = document.createElement('p');
                                        fourthZoneParagraph.textContent = `${ item.Зона_4 }`;
                                        fourthZoneParagraph.classList.add('table__paragraph');

                                        let fifthZoneTitle = document.createElement('h3');
                                        fifthZoneTitle.classList.add('table__info-title');
                                        fifthZoneTitle.textContent = `П'ята зона:`;
                                        let fifthZoneParagraph = document.createElement('p');
                                        fifthZoneParagraph.textContent = `${ item.Зона_5 }`;
                                        fifthZoneParagraph.classList.add('table__paragraph');
                                        let sixthZoneTitle = document.createElement('h3');
                                        sixthZoneTitle.classList.add('table__info-title');
                                        sixthZoneTitle.textContent = `Шоста зона:`;
                                        let sixthZoneParagraph = document.createElement('p');
                                        sixthZoneParagraph.textContent = `${ item.Зона_6 }`;
                                        sixthZoneParagraph.classList.add('table__paragraph');
                                        let seventhZoneTitle = document.createElement('h3');
                                        seventhZoneTitle.classList.add('table__info-title');
                                        seventhZoneTitle.textContent = `Сьома зона:`;
                                        let seventhZoneParagraph = document.createElement('p');
                                        seventhZoneParagraph.textContent = `${ item.Зона_7 }`;
                                        seventhZoneParagraph.classList.add('table__paragraph');
                                        
                                        tr.classList.add('table__info-tr');
                                        let lsvAbsentText = document.createElement('h3');
                                        lsvAbsentText.classList.add('table__info-title');
                                        lsvAbsentText.textContent = `Інформація про ЛСВ відсутня`;
                                        tr.append(lsvAbsentText);



                                        td.append(firstZoneTitle, firstZoneParagraph, secondZoneTitle, secondZoneParagraph,
                                            thirdZoneTitle, thirdZoneParagraph, fourthZoneTitle, fourthZoneParagraph, fifthZoneTitle, fifthZoneParagraph, 
                                            sixthZoneTitle, sixthZoneParagraph, seventhZoneTitle, secondZoneParagraph);
                                        tableRow.append(td, tr);
                                }
                                
                            });
                    })
                    .catch(error => console.log(error));
                    }
                    
                    });
                tableRowMainWord.appendChild(buttonWord);
                tableRow.appendChild(tableRowMainWord);
                lsvZoneTable.appendChild(tableRow);
                
            };                           
        })
        .catch(error => console.log(error));
        

}

