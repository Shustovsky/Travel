import playList from './playList.js';

const date = document.querySelector('.date');
const time = document.querySelector('.time');

const greeting = document.querySelector('.greeting');
const input = document.querySelector('.name');
const body = document.querySelector('body');

let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const airHumidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

let isPlay = false;
const player = document.querySelector('.player');
const play = document.querySelector('.play');
const audio = new Audio();
console.dir(audio);
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list')


//функция вывода текущей даты 
let showDate = () => {
        const fullDate = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const currentDate = fullDate.toLocaleDateString('en-US', options);
        date.textContent = currentDate;
    }
    //функция вывода приветсвия в зависимости от времени суток 

let getTimeOfDay = () => {
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

let showGreeting = () => {
        const timeOfDay = getTimeOfDay();
        const greetingText = `Good ${timeOfDay}`;
        greeting.textContent = greetingText;
    }
    //функция вывода текущего времени, а так же вызывает функцию даты и приветсвия
let showTime = () => {
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
    localStorage.setItem('nameInput', input.value);
    localStorage.setItem('nameCity', city.value || 'Minsk');
}
window.addEventListener('beforeunload', setLocalStorage)
    // window.addEventListener('beforeunload', () => setLocalStorage())

function getLocalStorage() {
    if (localStorage.getItem('nameInput')) {
        input.value = localStorage.getItem('nameInput');
    }
    if (localStorage.getItem('nameCity')) {
        city.value = localStorage.getItem('nameCity');
    }
}
window.addEventListener('load', getLocalStorage)

//функция возвращает рандомное число от 1 до 20
let getRandomNum = (min, max) => {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // функци по рандомному смене фона в зависимости от времени суток и рандомного числа

let setBg = () => {
    getRandomNum(1, 20);
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
let getSlideNext = () => {
    randomNum === 20 ? randomNum = 1 : randomNum++;
    setBg();
};
let getSlidePrev = () => {
    randomNum === 1 ? randomNum = 20 : randomNum--;
    setBg();
};
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// weather widget

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=4e9eb1d279204a03000f5c6c0a887baf&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        airHumidity.textContent = `Humidity: ${data.main.humidity}%`;
        weatherError.textContent = ``;
    } catch (err) {
        weatherError.textContent = `Error! city not found for '${city.value}'!`;
        temperature.textContent = ``;
        windSpeed.textContent = ``;
        airHumidity.textContent = ``;
        weatherDescription.textContent = '';

    }

}
city.addEventListener('change', getWeather);
window.addEventListener('load', getWeather);

//Quote of the Day widget

async function getQuotes() {
    const quotes = 'quotesEn.json';
    const res = await fetch(quotes);
    const data = await res.json();
    getRandomNum(0, data.length - 1);

    quote.textContent = `${data[randomNum].text}`;
    author.textContent = ` ${data[randomNum].author}`;

}
getQuotes();
changeQuote.addEventListener('click', getQuotes);

//audioplayer++

audio.addEventListener('loadeddata', () => {
    player.querySelector('.time-player .length').textContent = getTimeCodeFromNum(audio.duration); //.duration свойство возвращает длину медиа в секундах или ноль, если данные по медиа недоступны.
    audio.volume = .5;
}, false);
// функция показывающая длину песни в часах-минутах-секундах
let getTimeCodeFromNum = (num) => {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}
const timeline = player.querySelector('.timeline');
//перемотка с помощью прогресс бара
timeline.addEventListener('click', e => {
        const timelineWidth = window.getComputedStyle(timeline).width; //высчитывает длину прогресс бара
        const timetoSeek = e.offsetX / parseInt(timelineWidth) * audio.duration; //.offsetX, доступное только для чтения, показывает отступ курсора мыши по оси X от края целевого DOM узла.
        audio.currentTime = timetoSeek; //перемотка песни
    })
    //регулировка громкости и конпка mute
const soundVolume = document.querySelector('.sound-volume');
soundVolume.addEventListener('input', () => {
    audio.volume = soundVolume.value;
    console.log(typeof soundVolume.value);
})
let restoreValue;
let muter = () => {
    console.log(restoreValue);
    if (soundVolume.value === '0') {
        audio.volume = restoreValue;
        soundVolume.value = restoreValue;
    } else {
        restoreValue = soundVolume.value;;
        audio.volume = 0;
        soundVolume.value = 0;
    }
}
const volumeBtn = document.querySelector('.volume');
volumeBtn.addEventListener('click', muter);


//работа прогресс бара

setInterval(() => {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    document.querySelector('.current').textContent = getTimeCodeFromNum(audio.currentTime);
}, 500)

let trackTime = 0;
let nameSong = document.querySelector('.name-song');

let playAudio = () => {
    if (!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = trackTime;
        audio.play();
        isPlay = true;
        play.classList.add('pause');
        nameSong.textContent = playList[playNum].title;
    } else {
        isPlay = false;
        play.classList.remove('pause');
        trackTime = audio.currentTime;
        audio.pause();
    }
    document.querySelectorAll('.play-item').forEach((item, index) => {
        if (index === playNum) {
            item.classList.add('item-active');
        } else {
            item.classList.remove('item-active');
        }
    });

};
play.addEventListener('click', playAudio);

let playNum = 0;

let playNext = () => {
    trackTime = 0;
    playNum++;
    if (playNum > playList.length - 1) {
        playNum = 0;
    }
    isPlay = false
    playAudio();
};
let playPrev = () => {
    trackTime = 0;
    playNum--;
    if (playNum < 0) {
        playNum = playList.length - 1;
    }
    isPlay = false
    playAudio();
};
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = `${playList[i].title}`;
    playListContainer.append(li);

}
audio.addEventListener('ended', playNext);

document.querySelectorAll('.play-item').forEach((indicator, ind) => {
    indicator.addEventListener('click', () => {
        playNum = ind;
        isPlay = false;
        playAudio();
    })
})

//9. Получение фонового изображения от API

async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=do8HtGm3P6vH9IxczN2EX4hVxH591E4HisbwrgvEzPw';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular);

}


getLinkToImage();
async function getLinkToImage2() {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1334a81f1788b3b00d55d215514745b8&tags=nature&extras=url_l&format=json&nojsoncallback=1&tag_mode=all&sort=relevance&per_page=20&extras=url_h';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.photos.photo[0].url_l);

}

getLinkToImage2();