const resetGameButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('.js-button');
const startGameButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('.js-start_game');
const hiddenElements: NodeListOf<Element> = document.querySelectorAll<HTMLElement>('.box__hidden');
const stopwatch: HTMLDivElement = document.querySelector<HTMLDivElement>('.stopwatch');
const clickCounter: HTMLHeadElement = document.querySelector<HTMLHeadElement>('.js-counter');
const stopwatchWrapper: HTMLDivElement = document.querySelector<HTMLDivElement>('.stopwatch-wrapper');

// Randomized colors for end screen

const colors = ['#F2CEE6', '#C3DBC5', '#E8DCB9', '#E3A587', '#8FBFE0', '#7A89C2', '#EAE0CC', '#C5DAC1', '#B6A6CA', '#DEF2C8'];

// Memory game tile array and string randomizer

const contentArray: string[] = ['🍇GRAPE🍇', '🍇GRAPE🍇', '🍉MELON🍉', '🍉MELON🍉', '🍐PEAR🍐',
  '🍐PEAR🍐', '🍌BANANA🍌', '🍌BANANA🍌', '🍎APPLE🍎', '🍎APPLE🍎', '🥭MANGO🥭', '🥭MANGO🥭'];

const randomizedContent: string[] = contentArray.sort(() => {
  if (Math.random() > 0.5) {
    return 2;
  }
  return -1;
});

// Stopwatch functions

let startTime: number;
let stopWatchInterval: any;
let elapsedPausedTime = 0;

const pad = (number: number) => (number < 10 ? '0' : '') + number;

const updateStopwatch = () => {
  const currentTime = new Date().getTime(); // full time in miliseconds
  const elapsedTime = currentTime - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
  const minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
  const hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
  const displayTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`; // display time format
  stopwatch.innerHTML = displayTime; // display time being updated
};

const startStopwatch = () => {
  if (!stopWatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime;
    stopWatchInterval = setInterval(updateStopwatch, 1000);
  }
};

const stopStopwatch = () => {
  clearInterval(stopWatchInterval);
  elapsedPausedTime = new Date().getTime() - startTime;
  stopWatchInterval = null;
};

const resetStopwatch = () => {
  stopStopwatch();
  elapsedPausedTime = 0;
  stopwatch.innerHTML = '00:00:00';
};

// Counter for amount of clicks on tiles

let counter = 0;

const clickHandler = (event: Event) => {
  counter++;
  clickCounter.innerHTML = counter.toString(); // adding +1 and updating the counter

  const clickedBox = event.currentTarget as HTMLDivElement;
  clickedBox.classList.add('box__show'); // adds to the clickedBox 'box__show' so it doesn't have to go through loop

  setTimeout(() => {
    const showElements = document.querySelectorAll('.box__show'); // selects all elements with box__show class
    if (showElements.length > 1) {
      const [firstBox, secondBox] = showElements;

      // Checks if first box clicked and second box clicked HTMLS are equal, if they are new class
      // box__equal is added and box__show is removed.

      if (firstBox.innerHTML === secondBox.innerHTML) {
        firstBox.classList.add('box__equal');
        secondBox.classList.add('box__equal');

        secondBox.classList.remove('box__show');
        firstBox.classList.remove('box__show');

        // Victory conditions if length of box__equal is same as contentArray length the game is won

        if (document.querySelectorAll('.box__equal').length === contentArray.length) {
          stopStopwatch();
          startGameButton.innerHTML = '🥳 CONGRATULATIONS! 🥳';
          startGameButton.disabled = true;
          stopwatchWrapper.style.flexDirection = 'column';
          stopwatch.style.margin = '30px 0 0 0';
          clickCounter.innerHTML = ` You beat the game in ${counter} moves`;
          startGameButton.addEventListener('mouseenter', () => {
            startGameButton.style.opacity = '1';
          });

          setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            startGameButton.style.backgroundColor = randomColor;
          }, 500); // Interval for randomized colors on button background
        }
      } else {
        secondBox.classList.remove('box__show');
        firstBox.classList.remove('box__show');
      }
    }
  }, 500);
};

// Game loop, that goes through content Array

for (let i = 0; i < contentArray.length; i++) {
  const box = document.createElement('div'); // For every content in array creates new 'div' element
  box.className = 'box__item'; // Adds class to 'div' elements 'box__item'
  box.innerHTML = randomizedContent[i]; // Makes it so that the content in all 'div' is randomized
  box.addEventListener('click', clickHandler); // Click counter
  document.querySelector('.box__game').appendChild(box); // Adds every 'box' elements to the parent class - box__game
}

// Start and reset buttons

startGameButton.addEventListener('click', () => {
  hiddenElements.forEach((element) => {
    element.classList.remove('box__hidden');
  });
  startGameButton.innerHTML = 'MEMORY GAME';
  startGameButton.style.margin = '0 0 30px 0';
  startStopwatch();
});

startGameButton.addEventListener('mouseenter', () => {
  startGameButton.style.opacity = '0.8';
});

startGameButton.addEventListener('mouseleave', () => {
  startGameButton.style.opacity = '1';
});

resetGameButton.addEventListener('click', () => {
  document.location.reload(); // Makes it so the content is randomized on reload/reset;
  resetStopwatch();
});
