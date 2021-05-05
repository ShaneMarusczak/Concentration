"use strict";
(() => {
  let flippedCards = 0;
  let matchedCards = 0;
  let canFlip = true;
  let gameStarted = false;
  let gameOver = false;
  const utl = {
    cardCount: 40,
    matches: 20,
  };

  const createList = () => {
    const rv = [];
    for (let i = 1; i < 21; i++) {
      rv[i] = "cat" + i + ".png";
    }
    return rv;
  };

  const imageStore = createList();

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const assignment = () => {
    const arr1 = [];
    for (let i = 0; i < utl.matches; i++) {
      arr1.push(i + 1);
      arr1.push(i + 1);
    }
    return shuffle(arr1);
  };

  const matchList = assignment();

  const checkForMatch = () => {
    const cardsToCheck = document.querySelectorAll(".flip-card-flip");

    if (cardsToCheck[0].id === cardsToCheck[1].id) {
      cardsToCheck[0].remove();
      cardsToCheck[1].remove();
      if (++matchedCards === 20) {
        window.modal("You Win!", 1500);
        gameOver = true;
      }
    } else {
      cardsToCheck[0].classList.remove("flip-card-flip");
      cardsToCheck[1].classList.remove("flip-card-flip");
    }
    canFlip = true;
    flippedCards = 0;
  };

  (() => {
    document.getElementById("startBtn").addEventListener("click", () => {
      window.modal("Start!", 1500);
      gameStarted = true;
    });

    for (let i = 0; i < 5; i++) {
      const row = document.createElement("div");
      document.getElementById("cards").appendChild(row);
      row.classList.add("row");
      for (let j = 0; j < 8; j++) {
        const flipCard = document.createElement("div");
        const flipCardInner = document.createElement("div");
        const flipCardFront = document.createElement("div");
        const flipCardBack = document.createElement("div");
        const image = document.createElement("img");
        flipCard.classList.add("flip-card");
        flipCardInner.classList.add("flip-card-inner");
        flipCardFront.classList.add("flip-card-front");
        flipCardBack.classList.add("flip-card-back");
        flipCard.appendChild(flipCardInner);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        row.appendChild(flipCard);
        flipCardInner.id = matchList[i * 8 + j];
        image.src = "images/" + imageStore[matchList[i * 8 + j]];
        image.classList.add("cat-image");
        flipCardBack.appendChild(image);
        flipCard.addEventListener("click", () => {
          if (canFlip && gameStarted && !gameOver) {
            if (flipCardInner.classList.contains("flip-card-flip")) {
              flipCardInner.classList.remove("flip-card-flip");
              flippedCards--;
            } else {
              if (flippedCards === 0 || flippedCards === 1) {
                flipCardInner.classList.add("flip-card-flip");
                flippedCards++;
                if (flippedCards === 2) {
                  canFlip = false;
                  window.sleep(1250).then(checkForMatch);
                }
              }
            }
          }
        });
      }
    }
  })();
})();
