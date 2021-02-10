# Last Letter Game
This is a well-known letter game which is played between two people. The next word must start with the last letter of the previous word. 
Yet, there is a bit of change here. Will be explained later.

## How to Run
`yarn i` `yarn install`

## How to Play
Preferences screen appears at the beginning of the game. You can configure your game
and determine which one of `voice` and `text` you are to chose to proceed.
After saving preferences you can begin saying words as you are done with your configurations. 
Yet, initially, a random text appears on the screen after it is uttered. After that,
you can type an answer or use speechToText library by speaking to computer.

## Note
Instead of a complete OOP, I used fully function based solution and FP like approaches.
Players are constructed as strings whereas Game are constructed as Objects.

## Structure
The game structure is built with React hooks. `index.tsx` is the entrance file wrapped with 
[GameProvider](./src/context/GameProvider.tsx) which provides the state management through React Context. `useReducer` 
is used as a global state manager. Global state and reducer dispatcher are passed down the children via React Context and  
reached with context hook.

Preferences are kept in global state as game settings and is depended on these preferences to determine some business logics.

Since the game is built with React hooks, Therefore; strongly got benefits from some fascinating react hooks.
That are `useEffect`,  `useCallback`, `useMemo`

The game is build upon 3 main custom hooks; `useGamePlay`, `usePlayer`, `useWord` 
and also three Players types that provide inputs; 'COMPUTER', 'AUTO_PLAY, 'HUMAN'. To examine
t diagram which is prepared to explain the business logic used here in the game;

![Last letter diagram](./src/assets/last-letter.jpg?raw=true "Last letter diagram")

All business logic flows over `useGamePlay` and distributed to callbacks of  `usePlayer` and `useWord`.

`Players`'s inputs are in `InputWord` and the business logic of players 
changes considering player type.

## TODO
 - Change `game` global state structure
 - Tests

## Why useReducer ?
A better state management can be used here, but since a couple of state we have, 
we can stick with redux or etc.
