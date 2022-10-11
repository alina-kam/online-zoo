(function () {

    //Burger-menu in header

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


    // Pop-up in testimonials

    const testimonials = document.querySelector('.testimonials__cards');
    const testimonialsBlackoutBackground = document.querySelector('.testimonials__blackout-background');
    const popUpClose = document.querySelector('.popup-close');

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


    //Carousel in testimonials

    const thumbnails = ['chikchirik.jpg', 'barash.jpg', 'simpson.jpg', 'ukraine .png', 'boy.jpg', 'girl.jpg', 'enot.jpg', 'coolgorilla.jpg'];
    const userNames = ['Ann Smith', 'Bella Anagene', 'Nick Madoc ', 'Alex Jones', 'Jim Williams', 'Emily Brown', 'David Harris', 'Sophia Burton']
    const card = document.querySelector('.testimonials__card').innerHTML;

    /* const unicThumbnais = [];
    const unicNames = []; */

   /*  const getRandomThumbnail = (arr, arrUnic) => {
        let value = arr[Math.floor(Math.random() * 8)];
        if (!arrUnic.includes(value)){
            arrUnic.push(value)
            return value;
        }
        getRandomThumbnail(arr, arrUnic);
        return value;
    } */

    const getRandomThumbnail = () => thumbnails[Math.floor(Math.random() * 8)];
    const getRandomName = () => userNames[Math.floor(Math.random() * 8)];

    for(let i=0; i<8; i++){
        const newCard = document.createElement('div');
        newCard.innerHTML = card;
        newCard.classList.add('testimonials__card')

        let thumbnailUrl = getRandomThumbnail();
        newCard.querySelector('.user__thumbnail').src = '../../assets/images/' + thumbnailUrl;
        newCard.querySelector('.user__name').textContent = getRandomName();
        testimonials.append(newCard);

    }

}());