"use strict";
(() => {
  const order = [];

  const randomIntFromInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const flipCardHandler = () => {};

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

        flipCard.addEventListener("click", () => {
          if (flipCardInner.classList.contains("flip-card-flip")) {
            flipCardInner.classList.remove("flip-card-flip");
            sleep(250).then(() => flipCardFront.classList.remove("hidden"));
          } else {
            flipCardInner.classList.add("flip-card-flip");
            sleep(250).then(() => flipCardFront.classList.add("hidden"));
          }
        });
      }
    }
  })();
})();
