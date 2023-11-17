const resetGameButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('.js-button');
const startGameButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('.js-start_game');
const hiddenElements: NodeListOf<Element> = document.querySelectorAll<HTMLElement>('.box__hidden');

const contentArray: string[] = ['🍇GRAPE🍇', '🍇GRAPE🍇', '🍉MELON🍉', '🍉MELON🍉', '🍐PEAR🍐',
  '🍐PEAR🍐', '🍌BANANA🍌', '🍌BANANA🍌', '🍎APPLE🍎', '🍎APPLE🍎', '🥭MANGO🥭', '🥭MANGO🥭'];

const colors = ['#F2CEE6', '#C3DBC5', '#E8DCB9', '#E3A587', '#8FBFE0', '#7A89C2', '#EAE0CC', '#C5DAC1', '#B6A6CA', '#DEF2C8'];

const randomizedContent: string[] = contentArray.sort(() => {
  if (Math.random() > 0.5) {
    return 2;
  }
  return -1;
});

for (let i = 0; i < contentArray.length; i++) {
  const box = document.createElement('div');
  box.className = 'box__item';
  box.innerHTML = randomizedContent[i];
  document.querySelector('.box__game').appendChild(box);

  box.addEventListener('click', (event) => {
    const clickedBox = event.currentTarget as HTMLDivElement;
    clickedBox.classList.add('box__show');

    setTimeout(() => {
      const showElements = document.querySelectorAll('.box__show');
      if (showElements.length > 1) {
        const [firstBox, secondBox] = showElements;

        if (firstBox.innerHTML === secondBox.innerHTML) {
          firstBox.classList.add('box__equal');
          secondBox.classList.add('box__equal');

          secondBox.classList.remove('box__show');
          firstBox.classList.remove('box__show');

          if (document.querySelectorAll('.box__equal').length === contentArray.length) {
            startGameButton.innerHTML = '🥳 CONGRATULATIONS! 🥳';
            startGameButton.disabled = true;
            startGameButton.addEventListener('mouseenter', () => {
              startGameButton.style.opacity = '1';
            });
            setInterval(() => {
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              startGameButton.style.backgroundColor = randomColor;
            }, 500);
          }
        } else {
          secondBox.classList.remove('box__show');
          firstBox.classList.remove('box__show');
        }
      }
    }, 500);
  });
}
startGameButton.addEventListener('click', () => {
  hiddenElements.forEach((element) => {
    element.classList.remove('box__hidden');
  });
  startGameButton.innerHTML = 'MEMORY GAME';
});

startGameButton.addEventListener('mouseenter', () => {
  startGameButton.style.opacity = '0.8';
});

startGameButton.addEventListener('mouseleave', () => {
  startGameButton.style.opacity = '1';
});

resetGameButton.addEventListener('click', () => {
  document.location.reload();
});
