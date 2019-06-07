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
const wordCombTable = document.querySelector('.table-wordComb');
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
        dictionaryImage.removeAttribute('src');
        if (indexOfImage >= 2) {
            dictionaryImage.setAttribute('src', dictionarySources[indexOfImage -= 1])
        } else {
            leftButton.disabled = true;
            dictionaryImage.setAttribute('src', dictionarySources[0]);
        };
    };

    function onRightClick() {
        leftButton.disabled = false;
        currentSource = dictionaryImage.getAttribute('src');
        let indexOfImage = dictionarySources.indexOf(currentSource);
        dictionaryImage.removeAttribute('src');
        if (indexOfImage <= 4) {
            dictionaryImage.setAttribute('src', dictionarySources[indexOfImage += 1]);
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
    body.addEventListener("click", function (event) {
        const target = event.target;
        event.preventDefault();
        if (target.nodeName === "A") {
            const href = target.getAttribute("href");
            if (href) {
                const el = document.querySelector(href);
                const path =
                    el.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: path,
                    behavior: "smooth"
                });
            } else return;
        }
    });
    window.addEventListener('scroll', scrollModal);

    function scrollModal() {
        let scrolledPage = window.pageYOffset || document.documentElement.scrollTop;
        const bd = document.querySelector('.corpus');
        const modalWindow = document.querySelector('.dictionary-bd__modal-window');
        const td = document.querySelector('.td');
        const bdTop = bd.getBoundingClientRect().top + window.pageYOffset;
        let scrolled = scrolledPage;
        scrolled + 150 > bdTop ? modalWindow.classList.remove('hidden') : modalWindow.classList.add('hidden');
    }



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




    // let seventhZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/corpus7zone.json')




    let corpus = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_arsun/master/bd/zone.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(data => {
            for (let item of data) {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.classList.add('table-cell--info');
                td.classList.add('td');
                tr.classList.add('table__info-tr');
                tr.classList.add('hidden');
                td.classList.add('hidden');

                let tableRow = document.createElement('tr');
                let tableRowMainWord = document.createElement('td');
                tableRowMainWord.classList.add('table-cell', 'table-row-main-word');
                let buttonWord = document.createElement('button');
                buttonWord.classList.add('main-word-button');
                buttonWord.textContent = `${item.id}. ${item.СЛОВО}`;
                buttonWord.dataset.id = item.id;

                buttonWord.addEventListener('click', function (event) {
                    tr.classList.toggle('hidden');
                    td.classList.toggle('hidden');
                    const modalWindow = document.querySelector('.dictionary-bd__modal-window');
                    modalWindow.classList.add('hidden');
                    window.removeEventListener('scroll', scrollModal);
                    let buttonID = event.target.dataset.id;

                    function findExample(buttonID) {
                        let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/exampleSourse.json')
                            .then(response => {
                                if (response.ok) return response.json();
                                throw new Error(response.statusText);
                            })
                            .then(example => {
                                let number = 0;
                                let arr = example.filter(i => {
                                    if (Number(i.id_head_slovospoluka) === Number(buttonID)) {
                                        number++;
                                        let kontextLabel = document.createElement('p');
                                        kontextLabel.textContent = i.kontext;
                                        kontextLabel.classList.add('table__paragraph');
                                        let exampleLabel = document.createElement('p');
                                        exampleLabel.classList.add('table__paragraph');
                                        exampleLabel.textContent = i.pryklad;
                                        let sourseLabel = document.createElement('p');
                                        sourseLabel.classList.add('table__paragraph');
                                        sourseLabel.textContent = i.drzerelo;
                                        let kontextTitle = document.createElement('h3');
                                        kontextTitle.classList.add('table__info-title');
                                        kontextTitle.textContent = number + ') Контекст вживання: ';
                                        let exampleTitle = document.createElement('h3');
                                        exampleTitle.classList.add('table__info-title');
                                        exampleTitle.textContent = number + ") Приклад: ";
                                        let sourseTitle = document.createElement('h3');
                                        sourseTitle.classList.add('table__info-title');
                                        sourseTitle.textContent = number + ") Джерело прикладу:";
                                        // td.append(kontextTitle, kontextLabel, exampleTitle, exampleLabel, sourseTitle, sourseLabel);
                                    }
                                });
                            })
                            .catch(err => console.log(err));
                    };



                    if (!(td.classList.contains('hidden'))) {
                        findExample(buttonID);

                        let lsvZone = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/lsvZone.json')
                            .then(response => {
                                if (response.ok) return response.json();
                                throw new Error(response.statusText);
                            })
                            .then(inf => {
                                let idList = [];
                                let lsvIDlist = [];
                                for (let id of inf) {
                                    lsvIDlist.push(id.id);
                                }
                                let iList = inf.filter(i => {
                                    if (Number(i.id) === Number(buttonID)) {
                                        if (!(idList.includes(buttonID))) {
                                            idList.push(buttonID);
                                            tr.innerHTML = '';
                                            td.innerHTML = '';
                                            let firstZoneTitle = document.createElement('h3');
                                            firstZoneTitle.classList.add('table__info-title');
                                            firstZoneTitle.textContent = `Реєстрова одиниця:`;
                                            let firstZoneParagraph = document.createElement('p');
                                            firstZoneParagraph.textContent = `${item.Зона_1}`;
                                            firstZoneParagraph.classList.add('table__paragraph');
                                            let secondZoneTitle = document.createElement('h3');
                                            secondZoneTitle.classList.add('table__info-title');
                                            secondZoneTitle.textContent = `Граматична інформація (грам):`;
                                            let secondZoneParagraph = document.createElement('p');

                                            function findGramCode(buttonID) {
                                                let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/gramCodes.json')
                                                    .then(response => {
                                                        if (response.ok) return response.json();
                                                        throw new Error(response.statusText);
                                                    })
                                                    .then(example => {
                                                        let arr = example.filter(iii => {
                                                            console.log(iii.ID_slova, i.id, 'zalupa');
                                                            if (Number(iii.ID_slova) === Number(buttonID)) {
                                                                secondZoneParagraph.innerHTML = `<a href="${iii.adresa}">${item.Зона_2}</a>`;
                                                            }
                                                        });
                                                    })
                                                    .catch(err => console.log(err));
                                            };
                                            findGramCode(buttonID);
                                            secondZoneParagraph.classList.add('table__paragraph');
                                            let sixthZoneTitle = document.createElement('button');
                                            sixthZoneTitle.addEventListener('click', function () {
                                                sixthZoneParagraph.classList.toggle('hidden');
                                            })
                                            sixthZoneTitle.classList.add('table__info-title')
                                            sixthZoneTitle.textContent = `Парадигматичні відношення реєстрової одиниці:`;
                                            let sixthZoneParagraph = document.createElement('div');
                                            sixthZoneParagraph.classList.add('table__paragraph', 'hidden');
                                            let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/corpus6zone.json')
                                                .then(response => {
                                                    if (response.ok) return response.json();
                                                    throw new Error(response.statusText);
                                                })
                                                .then(example => {
                                                    let number = 0;
                                                    let arr = example.filter(i => {
                                                        if (Number(i.id) === Number(buttonID)) {
                                                            number++;
                                                            let section = document.createElement('div');
                                                            let synonymLabel = document.createElement('p');
                                                            synonymLabel.classList.add('table__paragraph');
                                                            synonymLabel.textContent = number + ')' + i.СИНОНІМИ;
                                                            let antonymLabel = document.createElement('p');
                                                            antonymLabel.classList.add('table__paragraph');
                                                            antonymLabel.textContent = number + ')' + i.АНТОНІМИ;
                                                            let hyponymLabel = document.createElement('p');
                                                            hyponymLabel.classList.add('table__paragraph');
                                                            hyponymLabel.textContent = number + ')' + i.ГІПОНІМИ;
                                                            let hyperonymLabel = document.createElement('p');
                                                            hyperonymLabel.classList.add('table__paragraph');
                                                            hyperonymLabel.textContent = number + ')' + i.ГІПЕРОНІМИ;
                                                            let omonymLabel = document.createElement('p');
                                                            omonymLabel.classList.add('table__paragraph');
                                                            omonymLabel.textContent = number + ')' + i.ОМОНІМИ;
                                                            section.append(synonymLabel, antonymLabel, hyponymLabel, hyperonymLabel, omonymLabel);
                                                            sixthZoneParagraph.append(section);
                                                        }

                                                    });
                                                })
                                                .catch(err => console.log(err));

                                            // let seventhZoneTitle = document.createElement('h3');
                                            // seventhZoneTitle.classList.add('table__info-title');
                                            // seventhZoneTitle.textContent = `Епідигматичні (дериваційні) відношення реєстрової одиниці:`;
                                            // let seventhZoneParagraph = document.createElement('p');
                                            // seventhZoneParagraph.textContent = `${ item.Зона_7 }`;
                                            // seventhZoneParagraph.classList.add('table__paragraph');


                                            let lsvThirdZoneTitle = document.createElement('button');
                                            lsvThirdZoneTitle.addEventListener('click', function () {
                                                lsvThirdZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvThirdZoneTitle.classList.add('table__info-title');
                                            lsvThirdZoneTitle.textContent = `1) Дефініція нова:`;
                                            let lsvThirdZoneParagraph = document.createElement('p');
                                            lsvThirdZoneParagraph.textContent = `${i.Зона_3_ЛСВ}`;
                                            lsvThirdZoneParagraph.classList.add('table__paragraph', 'hidden');
                                            let lsvFourthZoneTitle = document.createElement('button');
                                            lsvFourthZoneTitle.addEventListener('click', function () {
                                                lsvFourthZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvFourthZoneTitle.classList.add('table__info-title');
                                            lsvFourthZoneTitle.textContent = `1) Дефініція стара :`;
                                            let lsvFourthZoneParagraph = document.createElement('p');
                                            lsvFourthZoneParagraph.textContent = `${i.Зона_4_ЛСВ}`;
                                            lsvFourthZoneParagraph.classList.add('table__paragraph', 'hidden');

                                            let lsvfifthZoneTitle = document.createElement('button');
                                            lsvfifthZoneTitle.addEventListener('click', function () {
                                                lsvfifthZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvfifthZoneTitle.classList.add('table__info-title');
                                            lsvfifthZoneTitle.textContent = `1) Синтагматичні відношення реєстрової одиниці :`;
                                            let lsvfifthZoneParagraph = document.createElement('p');
                                            lsvfifthZoneParagraph.textContent = `${i.Зона_5_ЛСВ}`;
                                            lsvfifthZoneParagraph.classList.add('table__paragraph', 'hidden');
                                            let lsvseventhZoneTitle = document.createElement('button');
                                            lsvseventhZoneTitle.addEventListener('click', function () {
                                                lsvseventhZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvseventhZoneTitle.classList.add('table__info-title');
                                            lsvseventhZoneTitle.textContent = `1) Епідигматичні (дериваційні) відношення реєстрової одиниці:`;
                                            let lsvseventhZoneParagraph = document.createElement('p');
                                            lsvseventhZoneParagraph.textContent = `${i.Зона_7_ЛСВ}`;
                                            lsvseventhZoneParagraph.classList.add('table__paragraph', 'hidden');


                                            td.append(firstZoneTitle, firstZoneParagraph, secondZoneTitle, secondZoneParagraph,
                                                lsvThirdZoneTitle, lsvThirdZoneParagraph, lsvFourthZoneTitle, lsvFourthZoneParagraph,
                                                lsvfifthZoneTitle, lsvfifthZoneParagraph, lsvseventhZoneTitle, lsvseventhZoneParagraph, sixthZoneTitle, sixthZoneParagraph);

                                            tableRow.append(td);
                                        } else {
                                            let num = 1;
                                            num += 1;

                                            let lsvThirdZoneTitle = document.createElement('button');
                                            lsvThirdZoneTitle.classList.add('table__info-title');
                                            lsvThirdZoneTitle.addEventListener('click', function () {
                                                lsvThirdZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvThirdZoneTitle.textContent = num + `) Дефініція нова:`;
                                            let lsvThirdZoneParagraph = document.createElement('p');
                                            lsvThirdZoneParagraph.textContent = `${i.Зона_3_ЛСВ}`;
                                            lsvThirdZoneParagraph.classList.add('table__paragraph', 'hidden');
                                            let lsvFourthZoneTitle = document.createElement('button');
                                            lsvFourthZoneTitle.addEventListener('click', function () {
                                                lsvFourthZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvFourthZoneTitle.classList.add('table__info-title');
                                            lsvFourthZoneTitle.textContent = num + `) Дефініція стара:`;
                                            let lsvFourthZoneParagraph = document.createElement('p');
                                            lsvFourthZoneParagraph.textContent = `${i.Зона_4_ЛСВ}`;
                                            lsvFourthZoneParagraph.classList.add('table__paragraph', 'hidden');

                                            let lsvfifthZoneTitle = document.createElement('button');
                                            lsvfifthZoneTitle.addEventListener('click', function () {
                                                lsvfifthZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvfifthZoneTitle.classList.add('table__info-title');
                                            lsvfifthZoneTitle.textContent = num + `) Синтагматичні відношення реєстрової одиниці:`;
                                            let lsvfifthZoneParagraph = document.createElement('p');
                                            lsvfifthZoneParagraph.textContent = `${i.Зона_5_ЛСВ}`;
                                            lsvfifthZoneParagraph.classList.add('table__paragraph', 'hidden');
                                            let lsvseventhZoneTitle = document.createElement('button');
                                            lsvseventhZoneTitle.addEventListener('click', function () {
                                                lsvseventhZoneParagraph.classList.toggle('hidden');
                                            })
                                            lsvseventhZoneTitle.classList.add('table__info-title');
                                            lsvseventhZoneTitle.textContent = num + `) Епідигматичні (дериваційні) відношення реєстрової одиниці:`;
                                            let lsvseventhZoneParagraph = document.createElement('p');
                                            lsvseventhZoneParagraph.textContent = `${i.Зона_7_ЛСВ}`;
                                            lsvseventhZoneParagraph.classList.add('table__paragraph', 'hidden');
                                            td.append(lsvThirdZoneTitle, lsvThirdZoneParagraph, lsvFourthZoneTitle, lsvFourthZoneParagraph, lsvfifthZoneTitle, lsvfifthZoneParagraph, lsvseventhZoneTitle, lsvseventhZoneParagraph);
                                            tableRow.append(td);
                                        }

                                    } else if (!(lsvIDlist.includes(Number(buttonID)))) {

                                        td.innerHTML = '';
                                        let firstZoneTitle = document.createElement('h3');
                                        firstZoneTitle.classList.add('table__info-title');
                                        firstZoneTitle.textContent = `Реєстрова одиниця:`;
                                        let firstZoneParagraph = document.createElement('p');
                                        firstZoneParagraph.textContent = `${item.Зона_1}`;
                                        firstZoneParagraph.classList.add('table__paragraph');
                                        let secondZoneTitle = document.createElement('h3');
                                        secondZoneTitle.classList.add('table__info-title');
                                        secondZoneTitle.textContent = `Граматична інформація (грам):`;
                                        let secondZoneParagraph = document.createElement('p');
                                        secondZoneParagraph.classList.add('table__paragraph');

                                        function findGramCode(buttonID) {
                                            let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/gramCodes.json')
                                                .then(response => {
                                                    if (response.ok) return response.json();
                                                    throw new Error(response.statusText);
                                                })
                                                .then(example => {
                                                    let arr = example.filter(iii => {
                                                        if (Number(iii.ID_slova) === Number(buttonID)) {
                                                            secondZoneParagraph.innerHTML = `<a href="${iii.adresa}">${item.Зона_2}</a>`;
                                                        }
                                                    });
                                                })
                                                .catch(err => console.log(err));
                                        };
                                        findGramCode(buttonID);
                                        let thirdZoneTitle = document.createElement('button');
                                        thirdZoneTitle.addEventListener('click', function () {
                                            thirdZoneParagraph.classList.toggle('hidden');
                                        })
                                        thirdZoneTitle.classList.add('table__info-title');
                                        thirdZoneTitle.textContent = `Дефініція нова:`;
                                        let thirdZoneParagraph = document.createElement('p');
                                        thirdZoneParagraph.textContent = `${item.Зона_3}`;
                                        thirdZoneParagraph.classList.add('table__paragraph', 'hidden');
                                        let fourthZoneTitle = document.createElement('button');
                                        fourthZoneTitle.addEventListener('click', function () {
                                            fourthZoneParagraph.classList.toggle('hidden');
                                        })
                                        fourthZoneTitle.classList.add('table__info-title');
                                        fourthZoneTitle.textContent = `Дефініція стара:`;
                                        let fourthZoneParagraph = document.createElement('p');
                                        fourthZoneParagraph.textContent = `${item.Зона_4}`;
                                        fourthZoneParagraph.classList.add('table__paragraph', 'hidden');

                                        let fifthZoneTitle = document.createElement('button');
                                        fifthZoneTitle.addEventListener('click', function () {
                                            fifthZoneParagraph.classList.toggle('hidden');
                                        })
                                        fifthZoneTitle.classList.add('table__info-title');
                                        fifthZoneTitle.textContent = `Синтагматичні відношення реєстрової одиниці:`;
                                        let fifthZoneParagraph = document.createElement('p');
                                        fifthZoneParagraph.textContent = `${item.Зона_5}`;
                                        fifthZoneParagraph.classList.add('table__paragraph', 'hidden');
                                        let sixthZoneTitle = document.createElement('button');
                                        sixthZoneTitle.addEventListener('click', function () {
                                            sixthZoneParagraph.classList.toggle('hidden');
                                        })
                                        sixthZoneTitle.classList.add('table__info-title');
                                        sixthZoneTitle.textContent = `Парадигматичні відношення реєстрової одиниці:`;
                                        let sixthZoneParagraph = document.createElement('div');
                                        sixthZoneParagraph.classList.add('table__paragraph', 'hidden')
                                        let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/corpus6zone.json')
                                            .then(response => {
                                                if (response.ok) return response.json();
                                                throw new Error(response.statusText);
                                            })
                                            .then(example => {
                                                let number = 0;
                                                let arr = example.filter(i => {
                                                    if (Number(i.id) === Number(buttonID)) {
                                                        number++;
                                                        let section = document.createElement('div');
                                                        let synonymLabel = document.createElement('p');
                                                        synonymLabel.textContent = number + ')' + i.СИНОНІМИ;
                                                        synonymLabel.classList.add('table__paragraph');
                                                        let antonymLabel = document.createElement('p');
                                                        antonymLabel.textContent = number + ')' + i.АНТОНІМИ;
                                                        antonymLabel.classList.add('table__paragraph');
                                                        let hyponymLabel = document.createElement('p');
                                                        hyponymLabel.classList.add('table__paragraph');
                                                        hyponymLabel.textContent = number + ')' + i.ГІПОНІМИ;
                                                        let hyperonymLabel = document.createElement('p');
                                                        hyperonymLabel.classList.add('table__paragraph');
                                                        hyperonymLabel.textContent = number + ')' + i.ГІПЕРОНІМИ;
                                                        let omonymLabel = document.createElement('p');
                                                        omonymLabel.classList.add('table__paragraph');
                                                        omonymLabel.textContent = number + ')' + i.ОМОНІМИ;
                                                        section.append(synonymLabel, antonymLabel, hyponymLabel, hyperonymLabel, omonymLabel);
                                                        sixthZoneParagraph.append(section);
                                                    }

                                                });
                                            })
                                            .catch(err => console.log(err));


                                        let seventhZoneTitle = document.createElement('button');
                                        seventhZoneTitle.addEventListener('click', function () {
                                            seventhZoneParagraph.classList.toggle('hidden');
                                        })
                                        seventhZoneTitle.classList.add('table__info-title');
                                        seventhZoneTitle.textContent = `Епідигматичні (дериваційні) відношення реєстрової одиниці:`;
                                        let seventhZoneParagraph = document.createElement('p');
                                        seventhZoneParagraph.textContent = `${item.Зона_7}`;
                                        seventhZoneParagraph.classList.add('table__paragraph', 'hidden');



                                        td.append(firstZoneTitle, firstZoneParagraph, secondZoneTitle, secondZoneParagraph,
                                            thirdZoneTitle, thirdZoneParagraph, fourthZoneTitle, fourthZoneParagraph, fifthZoneTitle, fifthZoneParagraph,
                                            sixthZoneTitle, sixthZoneParagraph, seventhZoneTitle, seventhZoneParagraph);
                                        tableRow.append(td);
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

    let indexWC = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_arsun/master/bd/zone.json')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(data => {
            for (let item of data) {
                if (item.id != 31 && item.id != 32 && item.id != 6 && item.id != 35 && item.id != 63 && item.id != 27 && item.id != 13 && item.id != 22 && item.id != 38 && item.id != 40 &&
                    item.id != 50 && item.id != 52 && item.id != 53 && item.id != 61 && item.id != 62 && item.id != 66 && item.id != 69) {

                    let tr = document.createElement('tr');
                    let td = document.createElement('td');
                    td.classList.add('table-cell--info');
                    td.classList.add('td', 'iwc');
                    tr.classList.add('table__info-tr');
                    td.classList.add('hidden');
                    let buttonWord = document.createElement('button');
                    buttonWord.classList.add('main-word-button', 'iwb');
                    buttonWord.textContent = `${item.id}. ${item.СЛОВО}`;
                    buttonWord.dataset.id = item.id;
                    wordCombTable.append(buttonWord, td);

                    buttonWord.addEventListener('click', function (event) {


                        function findExample(event, buttonID) {
                            td.classList.toggle('hidden');
                            event.target.classList.add('target');
                            let exampleSourse = fetch('https://raw.githubusercontent.com/anastasiiayesypenko/dictionary_appling/master/bd/exampleSourse.json')
                                .then(response => {
                                    if (response.ok) return response.json();
                                    throw new Error(response.statusText);
                                })
                                .then(example => {
                                    let number = 0;
                                    let arr = example.filter(i => {
                                        if (Number(i.id_head_slovospoluka) === Number(buttonID)) {
                                            number++;
                                            const outWrap = document.createElement('div');
                                            outWrap.classList.add('outwrap');
                                            let kontextLabel = document.createElement('button')
                                            kontextLabel.textContent = i.kontext;
                                            kontextLabel.addEventListener('click', function () {
                                                inWrap.classList.toggle('hidden');
                                            });
                                            console.log(i.deryvat);
                                            const inWrap = document.createElement('div');
                                            inWrap.classList.add('wide');
                                            kontextLabel.classList.add('iwcF');
                                            let exampleLabel = document.createElement('p');
                                            exampleLabel.classList.add('table__paragraph');
                                            exampleLabel.textContent = i.pryklad;
                                            let sourseLabel = document.createElement('p');
                                            sourseLabel.classList.add('table__paragraph');
                                            sourseLabel.textContent = i.drzerelo;
                                            let exampleTitle = document.createElement('h3');
                                            exampleTitle.classList.add('table__info-title');
                                            exampleTitle.textContent = number + ") Приклад: ";
                                            let sourseTitle = document.createElement('h3');
                                            sourseTitle.classList.add('table__info-title');
                                            sourseTitle.textContent = number + ") Джерело прикладу:";
                                            inWrap.classList.add('hidden');
                                            outWrap.append(kontextLabel, inWrap);
                                            inWrap.append(exampleTitle, exampleLabel, sourseTitle, sourseLabel);
                                            td.append(outWrap);
                                        }
                                    });
                                })
                                .catch(err => console.log(err));
                        };
                        if (td.textContent.length === 0) {
                            findExample(event, buttonWord.dataset.id);
                        } else {
                            td.classList.toggle('hidden');
                            event.target.classList.toggle('target');
                        }

                    });

                };
            }
        })
        .catch(error => console.log(error));

}