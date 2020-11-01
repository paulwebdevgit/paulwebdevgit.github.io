let mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.arrow',

    },
    breakpoints: {

        // when window width is >= 540px
        540: {
            slidesPerView: 2,

        }
    }

});

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header');
let modalAuth = document.querySelector('.modal-auth');
let modal = document.querySelector('.modal');
let buttonClose = document.querySelector('.button-close');


burger.addEventListener('click', function() {
    burger.classList.toggle('header__burger-active')
    menu.classList.toggle('header-active');

})

modalAuth.addEventListener('click', () => {
    modal.classList.toggle('modal-active')
})

buttonClose.addEventListener('click', () => {
    modal.classList.toggle('modal-active')
})