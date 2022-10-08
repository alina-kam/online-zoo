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
}());