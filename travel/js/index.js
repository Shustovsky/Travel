console.log(`Вёрстка соответствует макету. Ширина экрана 390px +48
блок <header> +6
секция preview +9
секция steps +9
секция destinations +9
секция stories +9
блок <footer> +6
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
нет полосы прокрутки при ширине страницы от 1440рх до 390px +7
нет полосы прокрутки при ширине страницы от 390px до 320рх +8
На ширине экрана 390рх и меньше реализовано адаптивное меню +22
при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2
при нажатии на бургер-иконку плавно появляется адаптивное меню +4
адаптивное меню соответствует макету +4
при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)
при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4
`);


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

///////////////////////////////////////////////////////
// let navBurger = document.querySelector('.nav__burger');
// let burgerMenu = document.querySelector('.burger__menu');
// let burgerClose = document.querySelector('.burger__menu_close')
// let burgerList = document.querySelector('.burger__menu_list')

// navBurger.addEventListener('click', function() {
//     burgerMenu.classList.toggle('burger__menu-active');
// });
// burgerClose.addEventListener('click', function() {
//     burgerMenu.classList.toggle('burger__menu-active');
// });
// burgerList.addEventListener('click', function() {
//     burgerMenu.classList.toggle('burger__menu-active');
// });
// burgerMenu.addEventListener('click', function() {
//     if ('burger__menu-active' === true) {
//         burgerMenu.classList.toggle('burger__menu-active');

//     }
// });


//////////////////////////////////////////////////////////////

// let buttonPopup = document.querySelector('.btn_popup');
// let popup = document.querySelector('.popup');

// const toggleMenuPopup = () => {
//     popup.classList.toggle('popup-active');
// }

// buttonPopup.addEventListener('click', e => {
//     e.stopPropagation();

//     toggleMenuPopup();
// });

// document.addEventListener('click', e => {
//     let target = e.target;
//     let its_menu = target == popup || popup.contains(target);
//     let its_burger = target == buttonPopup;
//     let menu_is_active = popup.classList.toggle('popup-active');

//     if (!its_menu && !its_burger && menu_is_active) {
//         toggleMenuPopup();
//     }
// })


let buttonPopup = document.querySelector('.btn_popup');
let popup = document.querySelector('.popup');
let popupSign = document.querySelector('.popup_sign');


buttonPopup.addEventListener('click', function() {
    popup.classList.toggle('popup-active');
})
popupSign.addEventListener('click', function() {
    popup.classList.toggle('popup-active');
})