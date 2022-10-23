(function () {

    /*--- Layout ---*/

    const BODY = document.querySelector('body');

    let container = document.createElement('div');
    container.className = 'container';
    BODY.prepend(container);

    let menu = document.createElement('div');
    menu.className = 'menu';
    container.prepend(menu);

    let createButton = (text) => {
        let button = document.createElement('button');
        button.classList.add('button');
        button.innerHTML = text;
        menu.append(button);
    }
    createButton('Shuffle and start');
    createButton('Stop');
    createButton('Save');
    createButton('Results');

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
    timeCount.className = 'moves__count';
    timeCount.innerHTML = "00:00:00";
    time.append(timeCount);

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

    console.log(arr);


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

    /* -------------------------------------- */

    /*--- Choode blocks, that can be clicked ---*/

    let emptyBlockX = document.querySelector('.empty-block').getBoundingClientRect().left;
    console.log(emptyBlockX);
    let emptyBlockY = document.querySelector('.empty-block').getBoundingClientRect().top;
    console.log(emptyBlockY);

    let blockSize = document.querySelector('.game-field__block').offsetWidth;

    let blocksToClick = [];
    blocksToClick.push(document.elementFromPoint(emptyBlockX - blockSize, emptyBlockY),
                    document.elementFromPoint(emptyBlockX + blockSize, emptyBlockY),
                    document.elementFromPoint(emptyBlockX, emptyBlockY + blockSize),
                    document.elementFromPoint(emptyBlockX, emptyBlockY - blockSize)
    );

    blocksToClick = blocksToClick.filter(block => block.classList.contains('game-field__block'));
    console.log(blocksToClick);

    /* -------------------------------------- */




}())