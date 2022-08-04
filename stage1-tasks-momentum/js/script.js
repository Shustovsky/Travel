// time & calendar
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const input = document.querySelector('.name');
const body = document.querySelector('body');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

//функция вывода текущей даты 
showDate = () => {
        const fullDate = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const currentDate = fullDate.toLocaleDateString('en-US', options);
        date.textContent = currentDate;
    }
    //функция вывода приветсвия в зависимости от времени суток 
showGreeting = () => {
        getTimeOfDay = () => {
            const fullDate = new Date();
            const hours = fullDate.getHours();

            if (hours < 6) {
                return 'night';
            } else if (hours < 12) {
                return 'morning';
            } else if (hours < 18) {
                return 'afternoon';
            } else if (hours < 24) {
                return 'evening';
            }
        };
        const timeOfDay = getTimeOfDay();
        const greetingText = `Good ${timeOfDay}`;
        greeting.textContent = greetingText;
    }
    //функция вывода текущего времени, а так же вызывает функцию даты и приветсвия
showTime = () => {
    const fullDate = new Date();
    const currentTime = fullDate.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}
showTime();

//функция сохраняющая значение инпута
function setLocalStorage() {
    localStorage.setItem('name', input.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        input.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

//функция возвращает рандомное число от 1 до 20
getRandomNum = (min = 1, max = 20) => {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum();
// функци по рандомному смене фона в зависимости от времени суток и рандомного числа

setBg = () => {
    const timeOfDay = getTimeOfDay();
    const bgNum = (randomNum + '').padStart(2, '0');

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    }

}
setBg();

// функция прокрутки слайдер вправо и влево
getSlideNext = () => {
    randomNum === 20 ? randomNum = 1 : randomNum++;
    setBg();
};
getSlidePrev = () => {
    randomNum === 1 ? randomNum = 20 : randomNum--;
    setBg();
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);