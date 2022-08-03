// time & calendar
const date = document.querySelector('.date');
const time = document.querySelector('.time');

showDate = () => {
    const fullDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = fullDate.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
}

showTime = () => {
    const fullDate = new Date();
    const currentTime = fullDate.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
}
showTime();