# NeuroNation frontend coding challenge template

## The Challenge

Develop a simple player vs. computer mini-game:

- There are 3 units on the battlefield: Cavalry, Archers, Pikemen
- Here the strengths and weaknesses of each unit:
  - Cavalry:
    - defeats Archers
    - is defeated by Pikemen
  - Archers:
    - defeats Pikemen
    - is defeated by Cavalry
  - Pikemen:
    - defeats Cavalry
    - is defeated by Archers
  - If two units of the same type fight against each other, both are defeated
- Scoring:
  - Each time a player's unit defeats another, they get +1 score, otherwise -1

## The Requirements

- The game must support 1 player against the computer
- A first screen must display all 3 types of units to choose from and the player is expected to decide which one to send into battle as the next step
- After the player has sent a unit, the computer also decides for a unit to send. This is random, but one of the units is the computer's preference and always has 50% probability, while the others have 25% probability. Which one is the preference is initially randomly set, but the player does not know.
- Finally, the result of this round must be displayed
- The current scores are always visible at the top
- The game ends after 20 rounds by displaying final scores and the winner

## Extra Points (optional)

- A history of played rounds showing human and computer choices for each round must be available.

## Your Solution

Please use this template as the starting point for your solution. When you start working on your challenge fork this project and when you are finish make a pull request to the initial repository.

This project reproduces the common stack of technologies we are currently using in our projects. We expect you to reuse our stack for your solution. Imagine that you are adding a new feature to our existing project.

The stack is the following:

- Typescript - typed superset of Javascript to ensure static typing
- Create React App - toolkit to bootstrap react apps
- React - rendering engine
- Redux - application state management library
- Jest+@testing-library - unit-testing tools

Happy coding!
