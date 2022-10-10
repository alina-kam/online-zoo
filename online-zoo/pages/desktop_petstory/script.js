(function () {

    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__navigation');
    const menuCloseItem = document.querySelector('.header__navigation-close');
    const blackoutBackground = document.querySelector('.blackout-background');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__navigation_active');
        blackoutBackground.classList.add('blackout-background_active');
    });
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__navigation_active');
        blackoutBackground.classList.remove('blackout-background_active');
    })
    blackoutBackground.addEventListener('click', () => {
        menu.classList.remove('header__navigation_active');
        blackoutBackground.classList.remove('blackout-background_active');
    })


    const testimonials = document.querySelector('.testimonials__cards');
    const testimonialsBlackoutBackground = document.querySelector('.testimonials__blackout-background');
    const popUpClose = document.querySelector('.popup-close');
    console.log(popUpClose);

    testimonials.addEventListener('click', (event) => {
        let card = event.target.closest('.testimonials__card');
        if (!card) return;
        card.classList.add('testimonials__card_active');
        testimonialsBlackoutBackground.classList.add('blackout-background_active');

    })

    testimonialsBlackoutBackground.addEventListener('click', () => {
        testimonialsBlackoutBackground.classList.remove('blackout-background_active');
        let activeCard = document.querySelector('.testimonials__card_active');
        activeCard.classList.remove('testimonials__card_active');
    });

    testimonials.addEventListener('click', (event) => {
        let activeCard = document.querySelector('.testimonials__card_active');
        if (event.target.closest('.popup-close')){
            activeCard.classList.remove('testimonials__card_active');
            testimonialsBlackoutBackground.classList.remove('blackout-background_active');
            event.stopPropagation();
        }
    });




}());