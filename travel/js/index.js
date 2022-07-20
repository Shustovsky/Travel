'use strict'


console.log(``);

////////////////---------BURGER new---------/////////////
let burgerWrapper = document.querySelector('.burger_wrapper');
let burger = document.querySelector('.burger__menu');
let burgerBtn = document.querySelectorAll('.nav__burger');
let burgerClose = document.querySelector('.burger__menu_close');
let burgerLink = document.querySelectorAll('.burger__menu_list_item');

burgerBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        burgerWrapper.classList.add('burger_wrapper-active');
    })
})

burgerLink.forEach((button) => {
    button.addEventListener('click', (e) => {

        burgerWrapper.classList.remove('burger_wrapper-active');
    })
})

burgerClose.addEventListener('click', () => {
    burgerWrapper.classList.remove('burger_wrapper-active');
})


document.addEventListener('click', (e) => {
    if (e.target === burgerWrapper) {
        burgerWrapper.classList.remove('burger_wrapper-active')
    }
})



////////////////---------POPUP---------/////////////

let popupWrapper = document.querySelector('.popup_wrapper'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let popupLogin = document.querySelectorAll('.login_btn'); // Кнопки для показа окна
let popupBtn = document.querySelectorAll('.btn-popup');


popupLogin.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupWrapper.classList.add('popup_wrapper-active');
    })
})

document.addEventListener('click', (e) => {
    if (e.target === popupWrapper) {
        popupWrapper.classList.remove('popup_wrapper-active');
        popup.classList.remove('popup-create');
    }
})

popupBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupWrapper.classList.remove('popup_wrapper-active');
        popup.classList.remove('popup-create');
    })
})

//логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25

const welcome = () => {
    let mail = document.querySelector('.mail');
    let password = document.querySelector('.pass');

    alert(` Welcome bro! Нou have entered the following values:
    E-mail:  ${mail.value}, 
    Password: ${password.value}
    Please keep your data safe!!!`);
}

document.querySelector('.popup_sign').addEventListener('click', welcome);

//Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25

let register = document.querySelector('.popup_register_link');

document.addEventListener('click', (e) => {
    if (e.target === register) {
        popup.classList.add('popup-create');
    }
});

//////////////-----------SLIDER-----------////////////////////


const slider = document.querySelector('.destinations__slider');

const left = document.querySelector('.destinations__slider_arrow-left');
const right = document.querySelector('.destinations__slider_arrow-right');

const indicatorParent = document.querySelector('.destinations__slider_btns');

let index = 0;

let value;

if (document.documentElement.clientWidth > 700) {
    value = -59.5;
} else {
    value = -95.8;
};

left.addEventListener('click', function() {
    index = (index > 0) ? index - 1 : 0;
    document.querySelector('.destinations__slider_btns .destinations__slider_btn-active').classList.remove('destinations__slider_btn-active');
    indicatorParent.children[index].classList.add('destinations__slider_btn-active');
    slider.style.transform = 'translate(' + (index) * value + 'vw)';

    if (index !== 0) {
        document.querySelector('.destinations__slider_arrow-left').classList.add('destinations__slider_arrow-active');
        document.querySelector('.destinations__slider_arrow-right').classList.add('destinations__slider_arrow-active');
    } else {
        document.querySelector('.destinations__slider_arrow-left').classList.remove('destinations__slider_arrow-active');
    }

});

right.addEventListener('click', function() {
    index = (index < 2) ? index + 1 : 2;
    document.querySelector('.destinations__slider_btns .destinations__slider_btn-active').classList.remove('destinations__slider_btn-active');
    indicatorParent.children[index].classList.add('destinations__slider_btn-active');
    slider.style.transform = 'translate(' + (index) * value + 'vw)';

    if (index !== 2) {
        document.querySelector('.destinations__slider_arrow-right').classList.add('destinations__slider_arrow-active');
        document.querySelector('.destinations__slider_arrow-left').classList.add('destinations__slider_arrow-active');
    } else {
        document.querySelector('.destinations__slider_arrow-right').classList.remove('destinations__slider_arrow-active');
    }

});

document.querySelectorAll('.destinations__slider_btn').forEach(function(indicator, ind) {
    indicator.addEventListener('click', function() {
        index = ind;

        document.querySelector('.destinations__slider_btns .destinations__slider_btn-active').classList.remove('destinations__slider_btn-active');

        indicator.classList.add('destinations__slider_btn-active');
        slider.style.transform = 'translate(' + (index) * value + 'vw)';
    });
});