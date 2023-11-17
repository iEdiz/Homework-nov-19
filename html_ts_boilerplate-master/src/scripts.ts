const resetGameButton = document.querySelector<HTMLButtonElement>('.js-button');

const contentArray: string[] = ['🍇🍇', '🍇🍇', '🍉🍉', '🍉🍉', '🍐🍐',
  '🍐🍐', '🍌BANANA🍌', '🍌BANANA🍌', '🍎APPLE🍎', '🍎APPLE🍎', '🥭MANGO🥭', '🥭MANGO🥭'];

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

  box.onclick = function (event) {
    const clickedBox = event.currentTarget as HTMLDivElement;
    clickedBox.classList.add('box__show');

    setTimeout(() => {
      if (document.querySelectorAll('.box__show').length > 1) {
        if (document.querySelectorAll('.box__show')[0].innerHTML === document.querySelectorAll('.box__show')[1].innerHTML) {
          document.querySelectorAll('.box__show')[0].classList.add('box__equal');
          document.querySelectorAll('.box__show')[1].classList.add('box__equal');

          document.querySelectorAll('.box__show')[1].classList.remove('box__show');
          document.querySelectorAll('.box__show')[0].classList.remove('box__show');

          if (document.querySelectorAll('.box__equal').length === contentArray.length) {
            alert('YOU WON!');
          }
        } else {
          document.querySelectorAll('.box__show')[1].classList.remove('box__show');
          document.querySelectorAll('.box__show')[0].classList.remove('box__show');
        }
      }
    }, 500);
  };
}

resetGameButton.addEventListener('click', () => {
  document.location.reload();
});
