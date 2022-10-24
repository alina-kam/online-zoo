(function () {

    /*--- Layout ---*/

    const BODY = document.querySelector('body');

    let container = document.createElement('div');
    container.className = 'container';
    BODY.prepend(container);

    let menu = document.createElement('div');
    menu.className = 'menu';
    container.prepend(menu);

    let createButton = (text, id) => {
        let button = document.createElement('button');
        button.classList.add('menu__button', 'button');
        button.id = id;
        button.innerHTML = `<span>${text}</span>`;
        menu.append(button);
    }
    createButton('Shuffle and start', 'shuffle');
    createButton('Stop', 'stop');
    createButton('Save', 'save');
    createButton('Results', 'results');

    let buttonMenuMobile = document.createElement('button');
    buttonMenuMobile.classList.add('button-menu', 'button');
    buttonMenuMobile.innerHTML = 'Menu';
    container.prepend(buttonMenuMobile);

    let metrics = document.createElement('div');
    metrics.className = 'metrics';
    container.append(metrics);

    let moves = document.createElement('div');
    moves.classList.add('metrics__moves', 'moves');
    metrics.append(moves);

    let movesTitle = document.createElement('div');
    movesTitle.className = 'moves__title';
    movesTitle.innerHTML = "Moves:";
    moves.append(movesTitle);

    let movesCount = document.createElement('div');
    movesCount.className = 'moves__count';
    movesCount.innerHTML = "0";
    moves.append(movesCount);

    let time = document.createElement('div');
    time.classList.add('metrics__time', 'time');
    metrics.append(time);

    let timeTitle = document.createElement('div');
    timeTitle.className = 'time__title';
    timeTitle.innerHTML = "Time:";
    time.append(timeTitle);

    let timeCount = document.createElement('div');
    timeCount.className = 'time__count';
    timeCount.innerHTML = "00:00:00";
    time.append(timeCount);

    let soundCntrl = document.createElement('div');
    soundCntrl.classList.add('sound');
    soundCntrl.innerHTML = `<img src='./assets/soundOn.svg' alt='sound' width='20px'>`;
    metrics.append(soundCntrl);

    let gameField = document.createElement('div');
    gameField.className = 'game-field';
    container.append(gameField);

    /*--- Set sizes for blocks in game field ---*/

    let setBlockSize = (block) => {
        let blockSize = Math.floor(gameField.offsetWidth / 4) + 'px';
        block.style.width = blockSize;
        block.style.height = blockSize;
    }

    window.addEventListener('resize', () => {
        let blocks = document.querySelectorAll('.game-field__block');
        blocks.forEach(block => setBlockSize(block));
    })

    /* -----------------------------------------*/

    /*--- Create blocks, filed with with numbers ---*/

    let arr = [];
    let i = 0;
    let count = 16;
    while (i < count) {
        let number = Math.floor(Math.random() * (15 + 1 - 0) + 0);
        if (!arr.includes(number)) {
            arr.push(number);
            i++;
        }
    }

    let createBlock = (number) => {
        let block = document.createElement('div');
        block.classList.add('game-field__block');
        setBlockSize(block);
        if (number === 0) {
            block.classList.add('empty-block');
            block.innerHTML = '';
        }
        else {
            block.innerHTML = number;
        }
        gameField.append(block);
    }

    for (let i = 0; i < 16; i++) {
        createBlock(arr[i]);
    }

    /*-----------------------------------*/

    let currentSize = document.createElement('div');
    currentSize.classList.add('current-size');
    container.append(currentSize);

    let currentSizeTitle = document.createElement('div');
    currentSizeTitle.classList.add('current-size__title');
    currentSizeTitle.innerHTML = 'Frame size:';
    currentSize.append(currentSizeTitle);

    let currentSizeValue = document.createElement('div');
    currentSizeValue.classList.add('current-size__value');
    currentSizeValue.innerHTML = '4&times4';
    currentSize.append(currentSizeValue);

    let otherSizes = document.createElement('div');
    otherSizes.classList.add('other-sizes');
    container.append(otherSizes);

    let otherSizesTitle = document.createElement('div');
    otherSizesTitle.classList.add('field-size__title');
    otherSizesTitle.innerHTML = 'Other sizes:';
    otherSizes.append(otherSizesTitle);

    /*--- Create option sizes of game field ---*/

    let createSize = (blocksNumber) => {
        let otherSize = document.createElement('div');
        otherSize.classList.add('other-sizes__value');
        otherSize.innerHTML = `${blocksNumber}&times${blocksNumber}`;
        return otherSize;
    }

    otherSizes.append(createSize(3));
    otherSizes.append(createSize(4));
    otherSizes.append(createSize(5));
    otherSizes.append(createSize(6));
    otherSizes.append(createSize(7));
    otherSizes.append(createSize(8));

    /*--- Choode blocks, that can be clicked ---*/


    let countMoves = 0;

    document.querySelector('body').addEventListener('click', (event) => {
        let emptyBlock = document.querySelector('.empty-block');
        let blockSize = emptyBlock.offsetWidth;
        let emptyBlockX = emptyBlock.getBoundingClientRect().left;
        let emptyBlockY = emptyBlock.getBoundingClientRect().top;

        let blocksToClick = [];

        blocksToClick.push(document.elementFromPoint(emptyBlockX - blockSize, emptyBlockY),
            document.elementFromPoint(emptyBlockX + blockSize, emptyBlockY),
            document.elementFromPoint(emptyBlockX, emptyBlockY + blockSize),
            document.elementFromPoint(emptyBlockX, emptyBlockY - blockSize)
        );

        blocksToClick = blocksToClick.filter(block => block && block.classList.contains('game-field__block'));

        if (blocksToClick.includes(event.target)) {
            emptyBlock.innerHTML = event.target.innerHTML;
            emptyBlock.classList.remove('empty-block');
            event.target.innerHTML = "";
            event.target.classList.add('empty-block');
            countMoves++;
            movesCount.innerHTML = countMoves;
            let soundClick = new Audio('./assets/schelchok.mp3');
            if (!soundCntrl.classList.contains('muted')){
                soundClick.play();
            }

        }

    })

    /* ---- Mobile menu ---- */

    let buttonMenu = document.querySelector('.button-menu');

    buttonMenu.addEventListener('click', () => {
        menu.classList.toggle('menu_active');
    })

    /* --- StopWatch --- */

    let sec = 0;
    let min = 0;
    let hr = 0;

    let stopwatch = setInterval(() => {
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
        }
        if (min >= 60) {
            min = 0;
            hr++;
        }
        timeCount.innerHTML = (hr < 10 ? '0' + hr : hr)
            + ":" + (min < 10 ? '0' + min : min)
            + ":" + (sec < 10 ? '0' + sec : sec);
    }, 1000);

    /* --- Sound accompaniment of the movement of blocks --- */


    let muted = false;
    soundCntrl.addEventListener('click', () => {
        if (!muted) {
            muted = true;
            soundCntrl.classList.add('muted');
            soundCntrl.innerHTML = `<img src='./assets/soundOff.svg' alt='sound' width='20px'>`;
        }
        else{
            soundCntrl.classList.remove('muted');
            soundCntrl.innerHTML = `<img src='./assets/soundOn.svg' alt='sound' width='20px'>`;
            muted = false;
        }
    })



}())