(function () {

    /*--- Layout ---*/

    let blocksNumberInRow = 4;
    let blocksNumber = Math.pow(blocksNumberInRow, 2);

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
    createButton('Shuffle and start', 'restart');
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

    let currentSize = document.createElement('div');
    currentSize.classList.add('current-size');
    container.append(currentSize);

    let currentSizeTitle = document.createElement('div');
    currentSizeTitle.classList.add('current-size__title');
    currentSizeTitle.innerHTML = 'Frame size:';
    currentSize.append(currentSizeTitle);

    let currentSizeValue = document.createElement('div');
    currentSizeValue.classList.add('current-size__value');
    currentSizeValue.innerHTML = `${blocksNumberInRow}&times${blocksNumberInRow}`;
    currentSize.append(currentSizeValue);

    let otherSizes = document.createElement('div');
    otherSizes.classList.add('other-sizes');
    container.append(otherSizes);

    let otherSizesTitle = document.createElement('div');
    otherSizesTitle.classList.add('field-size__title');
    otherSizesTitle.innerHTML = 'Other sizes:';
    otherSizes.append(otherSizesTitle);


    /*--- Set sizes for blocks in game field ---*/

    let setBlockSize = (block) => {
        let blockSize = Math.floor(gameField.offsetWidth / blocksNumberInRow) + 'px';
        block.style.width = blockSize;
        block.style.height = blockSize;
    }

    window.addEventListener('resize', () => {
        let blocks = document.querySelectorAll('.game-field__block');
        blocks.forEach(block => setBlockSize(block));
    })

    /*--- Create blocks, filed with with numbers ---*/

    let createArrUnicNumbers = () => {
        let arr = [];
        let i = 0;
        let count = blocksNumber;
        while (i < count) {
            let number = Math.floor(Math.random() * count);
            if (!arr.includes(number)) {
                arr.push(number);
                i++;
            }
        }
        return arr;
    }

    let arr = createArrUnicNumbers();

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

    let creatBlocks = () => {
        for (let i = 0; i < blocksNumber; i++) {
            createBlock(arr[i]);
        }
    }

    creatBlocks();

    /* --- Restart game --- */

    let restartGame = () => {
        clearInterval(stopwatch);
        document.querySelector('.game-field').innerHTML = '';
        arr = createArrUnicNumbers();
        creatBlocks();
        movesCount.innerHTML = 0;
            countMoves = 0;
            sec = 0;
            min = 0;
            hr = 0;
            stopwatch = setInterval(tick, 1000);
            timeCount.innerHTML = '00:00:00';
    }

    /*--- Other sizes of game field ---*/

    let createOtherSize = (blocksNumberInRow) => {
        let otherSize = document.createElement('div');
        otherSize.classList.add('other-sizes__value');
        otherSize.id = blocksNumberInRow;
        otherSize.innerHTML = `${blocksNumberInRow}&times${blocksNumberInRow}`;
        return otherSize;
    }

    otherSizes.append(createOtherSize(3));
    otherSizes.append(createOtherSize(4));
    otherSizes.append(createOtherSize(5));
    otherSizes.append(createOtherSize(6));
    otherSizes.append(createOtherSize(7));
    otherSizes.append(createOtherSize(8));

    otherSizes.addEventListener('click', (event) => {
        if (event.target.id) {
            blocksNumberInRow = +event.target.id;
            blocksNumber = Math.pow(blocksNumberInRow, 2);
            document.querySelectorAll('.game-field__block').forEach(block => setBlockSize(block));
            document.querySelector('.current-size__value').innerHTML = `${blocksNumberInRow}&times${blocksNumberInRow}`;
            if (blocksNumberInRow >= 7) {
                document.querySelectorAll('.game-field__block').forEach(block => block.classList.add('very-small-text'));
            }
            else if (blocksNumberInRow >= 5) {
                document.querySelectorAll('.game-field__block').forEach(block => block.classList.add('small-text'));
            }
            restartGame();
        }
    })

    /*--- Move clicked block to an empty block ---*/

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
            if (!soundCntrl.classList.contains('muted')) {
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

    let tick = () => {
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
    }

    let stopwatch = setInterval(tick, 1000);

    /* --- Stop stopwatch --- */

    /*   let isWatchStopped = false;
      document.querySelector('#stop').addEventListener('click', () => {
          if (!isWatchStopped){
              clearInterval(stopwatch);
              isWatchStopped = true;
          }
          else{
              stopwatch = setInterval(tick, 1000);
              isWatchStopped = false;
          }
          gameField.classList.toggle('unclickable');
  
      }) */

    /* --- Sound accompaniment of the movement of blocks --- */

    let muted = false;
    soundCntrl.addEventListener('click', () => {
        if (!muted) {
            muted = true;
            soundCntrl.classList.add('muted');
            soundCntrl.innerHTML = `<img src='./assets/soundOff.svg' alt='sound' width='20px'>`;
        }
        else {
            soundCntrl.classList.remove('muted');
            soundCntrl.innerHTML = `<img src='./assets/soundOn.svg' alt='sound' width='20px'>`;
            muted = false;
        }
    })

    /* --- Restart game on button--- */

    let restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click', restartGame);



}())