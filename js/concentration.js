"use strict";
(() => {
  let flippedCards = 0;
  let matchedCards = 0;
  let canFlip = true;
  let gameStarted = false;
  let gameOver = false;
  let flipsCheckedCount = 0;
  let discoMode = false;
  let lastColor = "";
  const bestScore = document.getElementById("bestScore");
  const bestScoreOnLoad = Number(window.getCookie("concbestScore"));
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
    flipsCheckedCount++;

    if (matchList[cardsToCheck[0].id] === matchList[cardsToCheck[1].id]) {
      window.sleep(50).then(() => {
        Array.from(cardsToCheck[0].childNodes)
          .find((elem) => elem.classList.contains("flip-card-back"))
          .firstChild.classList.add("match-rotate");
        Array.from(cardsToCheck[1].childNodes)
          .find((elem) => elem.classList.contains("flip-card-back"))
          .firstChild.classList.add("match-rotate");
        Array.from(cardsToCheck[0].childNodes)
          .find((elem) => elem.classList.contains("flip-card-front"))
          .classList.remove("box-shadow");
        Array.from(cardsToCheck[1].childNodes)
          .find((elem) => elem.classList.contains("flip-card-front"))
          .classList.remove("box-shadow");
      });

      window.sleep(475).then(() => {
        cardsToCheck[0].remove();
        cardsToCheck[1].remove();
      });

      if (++matchedCards === 20) {
        let newbestScore =
          bestScoreOnLoad < 20
            ? flipsCheckedCount
            : flipsCheckedCount < bestScoreOnLoad
            ? flipsCheckedCount
            : bestScoreOnLoad;
        gameOver = true;
        window.sleep(700).then(() => {
          window.modal("Kaiya and Pepper!", 1000);
          window.sleep(1000).then(() => {
            window.sleep(3000).then(() => location.reload());
            window.modal("Best Score: " + newbestScore, 3000);
          });
        });
        window.setCookie("concbestScore", newbestScore, 7);
      }
    } else {
      cardsToCheck[0].classList.remove("flip-card-flip");
      cardsToCheck[1].classList.remove("flip-card-flip");
      window.sleep(800).then(() => {
        cardsToCheck[0].classList.add("grow");
        cardsToCheck[1].classList.add("grow");
      });
    }
    canFlip = true;
    flippedCards = 0;
  };

  const colorSelectHandler = () => {
    const select = document.getElementById("color-select");
    const colorTo = select.options[select.selectedIndex].value;

    const cards = document.querySelectorAll(".flip-card-front");

    if (colorTo === "disco") {
      discoMode = true;
      disco(cards);
    } else {
      discoMode = false;
      clearCardBackClasses(cards);
      addCardBackClass(cards, colorTo);
    }
  };

  const clearCardBackClasses = (cards) => {
    for (let card of cards) {
      card.classList.remove("grey-pattern");
      card.classList.remove("blue-pattern");
      card.classList.remove("purple-pattern");
      card.classList.remove("orange-pattern");
    }
  };

  const addCardBackClass = (cards, colorTo) => {
    for (let card of cards) {
      card.classList.add(colorTo + "-pattern");
    }
  };

  const disco = (cards) => {
    if (discoMode) {
      clearCardBackClasses(cards);
      const colors = ["grey", "blue", "purple", "orange"];
      let colorTo;
      do {
        colorTo = colors[window.randomIntFromInterval(0, 3)];
      } while (colorTo === lastColor);
      lastColor = colorTo;
      addCardBackClass(cards, colorTo);
      window.sleep(400).then(() => disco(cards));
    }
  };

  const dealCards = () => {
    const cards = document.querySelectorAll(".flip-card-inner");
    const len = cards.length;
    for (let i = 0; i < len; i++) {
      setTimeout(() => cards[i].classList.remove("hidden"), i * 57);
    }
  };

  (() => {
    document.getElementById("startBtn").addEventListener("click", () => {
      if (!gameStarted) {
        gameStarted = true;
        document
          .getElementById("startBtn")
          .classList.remove("startButtonFlash");
        document
          .getElementById("main-header")
          .classList.remove("header-before-start");
        document
          .getElementById("main-header")
          .classList.add("header-after-start");
        document.getElementById("menu").classList.remove("menu-before-start");
        document.getElementById("menu").classList.add("menu-after-start");
        document.getElementById("menu").classList.add("display-flex");
        document.getElementById("bestScoreContainer").remove();
        window.modal("Dealing Cards!", 40 * 57 + 275);
        document.querySelectorAll(".flip-card-inner").forEach((elem) => {
          elem.classList.add("grow");
          elem.classList.add("hover-cursor");
        });
        window.sleep(150).then(() => {
          dealCards();
        });
      }
    });

    document
      .getElementById("color-select")
      .addEventListener("change", colorSelectHandler);

    for (let i = 0; i < 5; i++) {
      const row = document.createElement("div");
      document.getElementById("cards").appendChild(row);
      row.classList.add("row");
      row.draggable = false;
      row.ondragstart = function () {
        return false;
      };
      row.onmousedown = function () {
        return false;
      };
      for (let j = 0; j < 8; j++) {
        const flipCard = document.createElement("div");
        const flipCardInner = document.createElement("div");
        const flipCardFront = document.createElement("div");
        const flipCardBack = document.createElement("div");
        const image = document.createElement("img");
        flipCard.classList.add("flip-card");
        flipCardInner.classList.add("flip-card-inner");
        flipCardFront.classList.add("flip-card-front");
        flipCardFront.classList.add("box-shadow");
        flipCardBack.classList.add("flip-card-back");
        flipCard.appendChild(flipCardInner);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCardInner.classList.add("hidden");
        row.appendChild(flipCard);
        flipCardInner.id = i * 8 + j;
        image.src = "images/" + imageStore[matchList[i * 8 + j]];
        image.classList.add("cat-image");
        flipCardBack.appendChild(image);
        flipCardInner.addEventListener("click", () => {
          if (canFlip && gameStarted && !gameOver) {
            if (flipCardInner.classList.contains("flip-card-flip")) {
              flipCardInner.classList.remove("flip-card-flip");
              flipCardInner.classList.add("grow");
              flippedCards--;
            } else {
              if (flippedCards === 0 || flippedCards === 1) {
                flipCardInner.classList.add("flip-card-flip");
                flipCardInner.classList.remove("grow");
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
    bestScore.textContent =
      bestScoreOnLoad < 20
        ? "No Best Score"
        : bestScoreOnLoad + " Pairs Flipped";
    colorSelectHandler();
  })();
})();
