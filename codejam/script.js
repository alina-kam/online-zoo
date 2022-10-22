(function () {
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
    moves.className = 'metrics__moves';
    moves.innerHTML = "Moves: 5"
    metrics.append(moves);

    let time = document.createElement('div');
    time.className = 'metrics__time';
    time.innerHTML = 'Time: 00:00:00'
    metrics.append(time);

    let gameField = document.createElement('div');
    gameField.className = 'game-field';
    container.append(gameField);

    let blockCreate = () => {
        let block = document.createElement('div');
        block.classList.add('game-field__block');
        block.style.width = Math.floor(gameField.offsetWidth / 4) + 'px';
        block.style.height = Math.floor(gameField.offsetWidth / 4) + 'px';
        console.log(block.style.width);
        gameField.append(block);
    }

    for (let i = 0; i < 16; i++) {
        blockCreate();
    }

    let currentSize = document.createElement('div');
    currentSize.classList.add('current-size');
    currentSize.innerHTML='Frame size: 4&times4';
    container.append(currentSize);

    let otherSizes = document.createElement('div');
    otherSizes.classList.add('other-sizes');
    container.append(otherSizes);

    let otherSizesTitle = document.createElement('span');
    otherSizesTitle.classList.add('field-size__title');
    otherSizesTitle.innerHTML='Other sizes:';
    otherSizes.append(otherSizesTitle);

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




}())