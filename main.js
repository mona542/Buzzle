document.addEventListener('DOMContentLoaded', () => {
    let playButton = document.querySelector(".play"),
        game = document.querySelector(".game"),
        buttons = Array.from(game.querySelectorAll('button')),
        timeSpan = document.querySelector('.footer span:nth-child(2)');

    let emptyBlockIndex = 15,
        startTime;

    playButton.addEventListener('click', function() {
        buttons.forEach((button , index) => {
            button.textContent = index + 1;
            button.addEventListener('click', moveButton);
        });
        buttons[emptyBlockIndex].textContent = '';

        shuffleButtons();
        startTime = Date.now();
        updateTimer();
    });

    function updateTimer() {
        let currentTime = Date.now();
        let diffTime = Math.floor((currentTime - startTime) / 1000);
        let minutes = Math.floor(diffTime / 60);
        let seconds = diffTime % 60;
        let formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        timeSpan.textContent = `Time: ${formattedTime}`;
        requestAnimationFrame(updateTimer);
    }

    function moveButton(){
        let buttonIndex = buttons.indexOf(this);

        if(isAdjacent(buttonIndex, emptyBlockIndex)){
            swapButtons(buttonIndex, emptyBlockIndex);
            emptyBlockIndex = buttonIndex;

            checkWin();
        }
    }

    function isAdjacent(index1, index2) {

        let rowLength = 4;

        if (Math.floor(index1 / rowLength) === Math.floor(index2 / rowLength) && Math.abs(index1 - index2) === 1) {

            return true;

        }

        if (index1 % rowLength === index2 % rowLength && Math.abs(index1 - index2) === rowLength) {

            return true;

        }
        
        return false;
    }

    function swapButtons(index1, index2){
        let temp = buttons[index1].textContent;
        buttons[index1].textContent = buttons[index2].textContent;
        buttons[index2].textContent = temp;
    }

    function shuffleButtons(){

        let buttonValues = buttons.map(button => button.textContent);

        let shuffleValues = buttonValues.sort(() => Math.random() - 0.5);

        buttons.forEach((button, index) =>{

            button.textContent = shuffleValues[index];

            if(button.textContent === ''){

                emptyBlockIndex = index;

            }

        });
        
    }

    function checkWin(){

        let sorted = buttons.map(button => button.textContent).map(Number);

        sorted.pop();

        let isSorted = sorted.every((val, i) => !i || val >= sorted[i - 1]);

        if(isSorted){
            alert(`Congratulation! You solved the puzzle`);
        }
    }

});