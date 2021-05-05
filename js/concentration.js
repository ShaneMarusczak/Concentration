"use strict";
(() => {
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

  const randomIntFromInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const assignment = () => {
    const arr1 = [];
    for (let i = 0; i < utl.matches; i++) {
      arr1.push(i + 1);
      arr1.push(i + 1);
    }
    return shuffle(arr1);
  };

  const matchList = assignment();

  (() => {
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
        flipCard.id = matchList[i * 8 + j];
        image.src = "images/" + imageStore[matchList[i * 8 + j]];
        image.classList.add("cat-image");
        flipCardBack.appendChild(image);
        flipCard.addEventListener("click", () => {
          if (flipCardInner.classList.contains("flip-card-flip")) {
            flipCardInner.classList.remove("flip-card-flip");
          } else {
            flipCardInner.classList.add("flip-card-flip");
          }
        });
      }
    }
  })();
})();
