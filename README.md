# Password Generator App — Frontend Mentor

## Description

This project is a solution for the **Frontend Mentor – Password Generator App** challenge.

The goal of the project was to build an interactive password generator that allows users to create secure passwords based on selected criteria. Users can control the password length, choose character types, generate a password, copy it to the clipboard, and see real-time visual feedback on password strength.

The application closely follows the original design and focuses on clean UI, accessibility, and correct password generation logic.

## Live Demo

👉 **[View deployed project](https://vitali-lavau.github.io/password-generator-app/)**

## Screenshot

![Component preview](./preview.jpg)

## How to run

1. Clone the repository.
2. Open `index.html` in your browser.

## Features

- Responsive layout for desktop and mobile
- Password length control via range slider (0–20 characters)
- Character type selection:
    - Uppercase letters
    - Lowercase letters
    - Numbers
    - Symbols
- Generate button disabled until minimum requirements are met
- Guaranteed inclusion of selected character types in the generated password
- Password strength indicator:
    - **TOO WEAK!** — 1 option selected
    - **WEAK** — 2 options selected
    - **MEDIUM** — 3 options selected
    - **STRONG** — 4 options selected
- Visual strength bars with dynamic colors
- Copy-to-clipboard functionality
- Keyboard and mouse interaction support

## Technologies used

- HTML5
- SCSS (BEM methodology, nested structure)
- Vanilla JavaScript
- MDN Web APIs:
    - `querySelector`
    - `addEventListener`
    - `dataset`
    - `navigator.clipboard`

## Project structure

- `index.html` — main markup
- `styles/` — SCSS/CSS styles
- `js/main.js` — password generation logic
- `images/` — icons and assets
- `preview.jpg` — project preview

## Author

**Vitali Lavau**
