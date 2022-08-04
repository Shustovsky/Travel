// time & calendar
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const input = document.querySelector('.name');

showDate = () => {
    const fullDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = fullDate.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
}

showGreeting = () => {
    getTimeOfDay = () => {
        const fullDate = new Date();
        const hours = fullDate.getHours();

        if (hours <= 6) {
            return 'night';
        } else if (hours <= 12) {
            return 'morning';
        } else if (hours <= 18) {
            return 'day';
        } else if (hours <= 24) {
            return 'evening';
        }
    };
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
}

showTime = () => {
    const fullDate = new Date();
    const currentTime = fullDate.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}
showTime();


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