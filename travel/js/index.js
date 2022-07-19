'use strict'


console.log(``);

////////////////---------BURGER---------/////////////

let navBurger = document.querySelector('.nav__burger');
let burgerMenu = document.querySelector('.burger__menu');

const toggleMenu = () => {
    burgerMenu.classList.toggle('burger__menu-active');
}

navBurger.addEventListener('click', e => {
    e.stopPropagation();

    toggleMenu();
});

document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == burgerMenu || burgerMenu.contains(target);
    let its_burger = target == navBurger;
    let menu_is_active = burgerMenu.classList.toggle('burger__menu-active');

    if (!its_menu && !its_burger && menu_is_active) {
        toggleMenu();
    }
})




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