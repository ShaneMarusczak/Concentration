# Concentration

Concentration is a web-based memory card game where players flip cards to find matching pairs. The game features smooth animations, CATS, configurable card designs—including a playful disco mode and tracks your best score using cookies. Designed with a responsive layout, it works well on both large displays and mobile devices.

---

## Installation Instructions

1. Ensure you have a modern web browser with JavaScript enabled.  
2. Download or clone the repository.  
3. Open the `index.html` file located in the root directory (e.g., `web_games/Concentration/index.html`) in your browser. No server setup is required; since this is a static web game, you can run it locally.

*Note:* The project fetches fonts from Google Fonts and uses locally available JavaScript and CSS files. Make sure your internet connection is active to load external assets.

---

## Usage Guide

- Open the `index.html` file in your browser.
- Click the **Start** button to begin the game. This will trigger a modal notification "Dealing Cards!" while the game board is being set up.
- Use your mouse or touch input to flip cards.
  - Clicking a card will flip it to reveal an image.
  - When two cards are flipped, the game will check for a match.
  - If the cards match, they are removed from the board with a fun rotation animation.
- Use the **Restart** button to reload the game at any time.
- Customize your game experience using the **Card Color** dropdown:
  - Options include Grey, Purple, Blue, Orange, or the dynamic Disco mode (which continually cycles the card background colors).
- Your best score (number of pairs flipped) is stored in a cookie and displayed on game load.

---

## File and Structure Overview

- **index.html**  
  The main HTML file containing the game’s structure, links to CSS and JavaScript files, meta tags for responsiveness, and header elements including navigation links.

- **css/**  
  - *style.css*: Unminified stylesheet defining the base styles, layout, and animations of the game.
  - *style.min.css*: Minified version for optimized loading.
  
- **js/**  
  - *concentration.js*: The full version of the JavaScript code managing the game logic, card dealing, matching logic, cookie handling for the best score, modal messages, and color selection (including disco mode).
  - *concentration.min.js*: Minified JavaScript file for production use.

- **images/**  
  Contains game images such as the card images (e.g., `cat1.png` to `cat20.png`), GitHub and home icons, and other decorative graphics.

- **Other Files:**  
  - *LICENSE*: Contains the licensing information for the project (if available).
  - *CONTRIBUTING.md*: Guidelines for contributing to the project (if available).

---

## Configuration Details

- **index.html Meta Tags**  
  - The meta viewport is set to a fixed width (width=800) for consistent game display.
  - The document load includes external fonts from Google Fonts (`Roboto Mono` and `Roboto`) which are applied across the game.

- **CSS Configurations**  
  - The root colors, fonts, animations (e.g., card flipping and rotation), and responsive display settings are defined in both `style.css` and `style.min.css`.
  - Custom classes (e.g., `.grey-pattern`, `.purple-pattern`) are used for card backgrounds and are dynamically assigned based on user selection.

- **JavaScript Settings**  
  - Game logic such as card shuffling, matching, and score tracking is managed in `concentration.js`/`concentration.min.js`.
  - Cookie management is implemented to save and retrieve the best score with a 7-day expiry.
  - The color selection handler applies CSS classes to the cards dynamically, with an option for a “disco” mode which continuously changes the card color at set intervals.

---

## Contribution Guidelines

Contributions to Concentration are welcome!  
- Please review the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on the code of conduct and the process for submitting pull requests.
- Bug reports and feature suggestions are appreciated via the GitHub repository’s issue tracker.

---

## License Information

This project is licensed under the terms specified in the [LICENSE](LICENSE) file. Please refer to that file for more details.

---

Enjoy playing Concentration and feel free to experiment with the styles and game logic to create your own fun variations!
