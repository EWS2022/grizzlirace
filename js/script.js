const allButtonControlPannel = document.querySelectorAll('.control-pannel button');
const addHoneyLink = document.querySelector('.control-pannel__getHoney');
const batPlusButton = document.querySelector('.bat__plus');
const batMinusButton = document.querySelector('.bat__minus');
const batAllButton = document.querySelector('.bat__all');
const returnDebtOpenButton = document.querySelector('.debt button');
const returnDebtButton = document.querySelector('.return-form button');
const returnDebtinput = document.querySelector('.return-form input');
const wrapper = document.querySelector('.wrapper');
let honeyNumber = 0;
let batNumber = 0;
let debtNumber = 0;
let nameCarChoised = '';
let winner = false;
const audioWin = document.querySelector('.winAudio');
audioWin.volume = 0.1;
const audioLost = document.querySelector('.lostAudio');
audioLost.volume = 0.1;
const johnnyCar = document.querySelector('.grizzli1');
const nathanCar = document.querySelector('.grizzli2');
const debtSpan = document.querySelector('.debt__span');
const batSpan = document.querySelector('.total__bat_span');
const honeySpan = document.querySelector('.total__account_span');
const johnnyButton = document.querySelector('.johnny');
const nathanButton = document.querySelector('.nathan');
const startButton = document.querySelector('.start');
const historyListUl = document.querySelector('ul');
const historyHamburger = document.querySelector('.historyHamburger');
const history = document.querySelector('.history');
historyHamburger.onclick = function () {
    history.classList.toggle('moveHistory');
}

if (localStorage.getItem('totalHoneySave')) {
    honeyNumber = parseInt(localStorage.getItem('totalHoneySave'));
    honeySpan.innerText = honeyNumber;
}

if (localStorage.getItem('debtHoneySave')) {
    debtNumber = parseInt(localStorage.getItem('debtHoneySave'));
    debtSpan.innerText = debtNumber;
}


checkHoney();
let historyList = [];
if (localStorage.getItem('historySave')) {
    historyList = JSON.parse(localStorage.getItem('historySave'));
}
function historyRander() {
    historyListUl.innerHTML = '';
    for (let i = 0; i < historyList.length; i++) {
        let historyItem = historyList[i];
        if (historyItem.class == 'history__add') {
            let li = document.createElement('li');
            li.classList.add('history__add');

            let spanDate = document.createElement('span');
            spanDate.classList.add('date');
            spanDate.innerText = historyItem.date;
            li.appendChild(spanDate);

            let pOperationName = document.createElement('p');
            pOperationName.classList.add('operation-name');
            pOperationName.innerText = 'Miel emprunté';
            li.appendChild(pOperationName);

            let pTotal = document.createElement('p');
            pTotal.innerHTML = 'Total: <span class="total-number">5</span> pots de miel';
            li.appendChild(pTotal);

            let pDebt = document.createElement('p');
            pDebt.innerHTML = 'Dette de miel: <span class="debt-number"></span> pots de miel';
            let spanDebt = pDebt.querySelector('.debt-number');
            spanDebt.innerText = historyItem.debtHoney;
            li.appendChild(pDebt);

            historyListUl.appendChild(li);

        } else if (historyItem.class == 'history__win') {
            let li = document.createElement('li');
            li.classList.add('history__win');

            let spanDate = document.createElement('span');
            spanDate.classList.add('date');
            spanDate.innerText = historyItem.date;
            li.appendChild(spanDate);

            let pOperationName = document.createElement('p');
            pOperationName.classList.add('operation-name');
            pOperationName.innerHTML = 'Parié <span class="bat-number"></span> pots de miel pour <span class="bat_name"></span>. <span class="result">Victoire!</span>';
            li.appendChild(pOperationName);

            let spanBat = pOperationName.querySelector('.bat-number');
            spanBat.innerText = historyItem.batHoney;

            let spanBatName = pOperationName.querySelector('.bat_name');
            spanBatName.innerText = historyItem.batName;

            let pTotal = document.createElement('p');
            pTotal.innerHTML = 'Total: <span class="total-number"></span> pots de miel';
            let spanTotalNumber = pTotal.querySelector('.total-number');
            spanTotalNumber.innerText = historyItem.totalHoney;
            li.appendChild(pTotal);

            let pDebt = document.createElement('p');
            pDebt.innerHTML = 'Dette de miel: <span class="debt-number"></span> pots de miel';
            let spanDebt = pDebt.querySelector('.debt-number');
            spanDebt.innerText = historyItem.debtHoney;
            li.appendChild(pDebt);

            historyListUl.appendChild(li);
        } else if (historyItem.class == 'history__return') {
            let li = document.createElement('li');
            li.classList.add('history__return');

            let spanDate = document.createElement('span');
            spanDate.classList.add('date');
            spanDate.innerText = historyItem.date;
            li.appendChild(spanDate);

            let pOperationName = document.createElement('p');
            pOperationName.classList.add('operation-name');
            pOperationName.innerHTML = 'Miel retourné: <span class="return-number"></span>';
            li.appendChild(pOperationName);

            let spanReturn = pOperationName.querySelector('.return-number');
            spanReturn.innerText = historyItem.returnNumber;

            let pTotal = document.createElement('p');
            pTotal.innerHTML = 'Total: <span class="total-number"></span> pots de miel';
            let spanTotalNumber = pTotal.querySelector('.total-number');
            spanTotalNumber.innerText = historyItem.totalHoney;
            li.appendChild(pTotal);

            let pDebt = document.createElement('p');
            pDebt.innerHTML = 'Dette de miel: <span class="debt-number"></span> pots de miel';
            let spanDebt = pDebt.querySelector('.debt-number');
            spanDebt.innerText = historyItem.debtHoney;
            li.appendChild(pDebt);

            historyListUl.appendChild(li);

        } else if (historyItem.class == 'history__lost') {
            let li = document.createElement('li');
            li.classList.add('history__lost');

            let spanDate = document.createElement('span');
            spanDate.classList.add('date');
            spanDate.innerText = historyItem.date;
            li.appendChild(spanDate);

            let pOperationName = document.createElement('p');
            pOperationName.classList.add('operation-name');
            pOperationName.innerHTML = 'Parié <span class="bat-number"></span> pots de miel pour <span class="bat_name"></span>. <span class="result">Défaite!</span>';
            li.appendChild(pOperationName);

            let spanBat = pOperationName.querySelector('.bat-number');
            spanBat.innerText = historyItem.batHoney;

            let spanBatName = pOperationName.querySelector('.bat_name');
            spanBatName.innerText = historyItem.batName;

            let pTotal = document.createElement('p');
            pTotal.innerHTML = 'Total: <span class="total-number"></span> pots de miel';
            let spanTotalNumber = pTotal.querySelector('.total-number');
            spanTotalNumber.innerText = historyItem.totalHoney;
            li.appendChild(pTotal);

            let pDebt = document.createElement('p');
            pDebt.innerHTML = 'Dette de miel: <span class="debt-number"></span> pots de miel';
            let spanDebt = pDebt.querySelector('.debt-number');
            spanDebt.innerText = historyItem.debtHoney;
            li.appendChild(pDebt);

            historyListUl.appendChild(li);
        }
    }
    localStorage.setItem('historySave', JSON.stringify(historyList));
    console.log(historyList);
}

historyRander();
checkHoney();
checkDebt();
addHoneyLink.onclick = function () {
    honeyNumber = honeyNumber + 5;
    honeySpan.innerText = honeyNumber;
    addHoneyLink.classList.add('desactive');
    addHoneyLink.classList.remove('pulsar');
    debtNumber = debtNumber + 5;
    debtSpan.innerText = debtNumber;
    let historyNewItem = {
        class: 'history__add',
        totalHoney: honeyNumber,
        debtHoney: debtNumber,
        date: getDateTime(),
    };
    historyList.unshift(historyNewItem);
    historyRander();
    localStorage.setItem('totalHoneySave', honeyNumber);
    localStorage.setItem('debtHoneySave', debtNumber);
    checkDebt();
}

batPlusButton.onclick = function () {
    if (honeyNumber > 0) {
        honeyNumber = honeyNumber - 1;
        batNumber = batNumber + 1;
        honeySpan.innerText = honeyNumber;
        batSpan.innerText = batNumber;
    }
}

batMinusButton.onclick = function () {
    if (batNumber > 0) {
        honeyNumber = honeyNumber + 1;
        batNumber = batNumber - 1;
        honeySpan.innerText = honeyNumber;
        batSpan.innerText = batNumber;
    }
}
batAllButton.onclick = function () {
    if (honeyNumber > 0) {
        batNumber = honeyNumber + batNumber;
        honeyNumber = honeyNumber - honeyNumber;
        honeySpan.innerText = honeyNumber;
        batSpan.innerText = batNumber;
    }
}

johnnyButton.onclick = function () {
    johnnyButton.classList.remove('nochoised');
    johnnyButton.classList.add('choised');
    nathanButton.classList.remove('choised');
    nathanButton.classList.add('nochoised');
    nameCarChoised = 'Johnny';
}

nathanButton.onclick = function () {
    johnnyButton.classList.remove('choised');
    johnnyButton.classList.add('nochoised');
    nathanButton.classList.remove('nochoised');
    nathanButton.classList.add('choised');
    nameCarChoised = 'Nathan';
}

startButton.onclick = function () {
    if (batNumber > 0) {
        if (nameCarChoised != '') {
            winner = false;
            buttonAllDesactive();
            carMovement(johnnyCar, 'Johnny');
            carMovement(nathanCar, 'Nathan');
            johnnyCar.classList.add('move');
            nathanCar.classList.add('move');
        } else {
            alert('Choisissez qui gagnera !')
        }
    } else {
        alert('Remets du miel !')
    }
}

function buttonAllDesactive() {
    for (let i = 0; i < allButtonControlPannel.length; i++) {
        allButtonControlPannel[i].classList.add('desactive');

    }
}

function buttonAllActive() {
    for (let i = 0; i < allButtonControlPannel.length; i++) {
        allButtonControlPannel[i].classList.remove('desactive');

    }
}

function carMovement(car, carName) {
    let progress = 1.4;
    let goInterval = setInterval(() => {
        progress = progress + Math.random() * 0.1;
        car.style.left = progress + '%';
        if (progress > 82.11) {
            winner = true;
            if (carName == nameCarChoised) {
                honeyNumber = honeyNumber + batNumber * 2;
                honeySpan.innerText = honeyNumber;
                let historyNewItem = {
                    class: 'history__win',
                    batHoney: batNumber,
                    batName: nameCarChoised,
                    totalHoney: honeyNumber,
                    debtHoney: debtNumber,
                    date: getDateTime(),
                };
                historyList.unshift(historyNewItem);
                historyRander();
                batNumber = 0;
                batSpan.innerText = batNumber;
                localStorage.setItem('totalHoneySave', honeyNumber);
                audioWin.play();

            } else {
                let historyNewItem = {
                    class: 'history__lost',
                    batHoney: batNumber,
                    batName: nameCarChoised,
                    totalHoney: honeyNumber,
                    debtHoney: debtNumber,
                    date: getDateTime(),
                };
                historyList.unshift(historyNewItem);
                historyRander();
                batNumber = 0;
                batSpan.innerText = batNumber;
                checkHoney();
                localStorage.setItem('totalHoneySave', honeyNumber);
                audioLost.play();
            }
        }
        if (winner == true) {
            clearInterval(goInterval);
            buttonAllActive();
            johnnyCar.classList.remove('move');
            nathanCar.classList.remove('move');
            johnnyButton.classList.remove('nochoised');
            johnnyButton.classList.remove('choised');
            nathanButton.classList.remove('choised');
            nathanButton.classList.remove('nochoised');
            nameCarChoised = '';
        }
    }, 1);
}

returnDebtOpenButton.onclick = function () {
    wrapper.classList.add('wrapper_visible');
}

returnDebtButton.onclick = function () {
    if (returnDebtinput.value != null) {
        let returnDebtNumber = parseInt(returnDebtinput.value);
        if (returnDebtNumber <= honeyNumber) {
            honeyNumber = honeyNumber - returnDebtNumber;
            debtNumber = debtNumber - returnDebtNumber;
            debtSpan.innerText = debtNumber;
            honeySpan.innerText = honeyNumber;
            checkHoney();
            let historyNewItem = {
                class: 'history__return',
                returnNumber: returnDebtNumber,
                totalHoney: honeyNumber,
                debtHoney: debtNumber,
                date: getDateTime(),
            };
            historyList.unshift(historyNewItem);
            historyRander();
            localStorage.setItem('debtHoneySave', debtNumber);
            localStorage.setItem('totalHoneySave', honeyNumber);
            checkDebt()
        }
        wrapper.classList.remove('wrapper_visible');
        returnDebtinput.value = null;
    } else {
        alert('Tu as oublié de retourner de l argent');
    }
}

wrapper.onclick = function (e) {
    console.log(e);
    const target = e.target;
    if (target.classList.contains('wrapper')) {
        wrapper.classList.remove('wrapper_visible');
        returnDebtinput.value = null;
    }
}

function checkHoney() {
    if (honeyNumber == 0 && batNumber == 0) {
        addHoneyLink.classList.remove('desactive');
        addHoneyLink.classList.add('pulsar');
    } else {
        addHoneyLink.classList.add('desactive');
        addHoneyLink.classList.remove('pulsar');
    }
}

function checkDebt() {
    if (debtNumber > 0) {
        returnDebtOpenButton.classList.remove('desactive');
    } else {
        returnDebtOpenButton.classList.add('desactive');
    }
}

function getDateTime() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let dateStrong = `${day}/${month}/${year} ${hours}:${minutes}`;
    return dateStrong;
}