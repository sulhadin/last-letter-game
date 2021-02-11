# Last Letter Game
This is a well-known letter game which is played between two people. The next word must start with the last letter of the previous word. 
Yet, there is a bit of change here. Will be explained later.

## How to Run
`yarn i` `yarn install`

## How to Play
Preferences screen appears at the beginning of the game. You can configure your game
and select one of `voice` and `text` you are to chose to play by.

Initially, a random selected name appears on the screen then it is uttered. After that,
you can type an answer or use your microphone  to say your response to computer.

## Game Rules
Preferences determine the game rules which are change able and, which brings the game easy or hard mode.

```js
 {
 charLength: number;
 letterFromEnd: boolean;
 probabilityPercent: number;
 restricted: boolean;
 }
```
Let's explain these preferences;
`charLength` Normal game is dependent on 1 letter which you can get and start, but not here!
### Example
Let's set `charLength` to `1`
Ahmet -> the last letter is `T` and the next word should start with it. (e.g. Tahir)
Let's set `charLength` to `3`
Ahmet -> the last 3 letters are `MET` and the next word should start with them. (e.g. Metin)

`letterFromEnd` Also can get letters from beginning to make the game more interesting.
### Example
Let's set `letterFromEnd` to `false`
Ahmet -> the first letter is `A` and the next word should start with it. (e.g. Aylin)
Let's set `charLength` to `2`
Ahmet -> the first 2 letters are `Ah` and the next word should start with them. (e.g. Ahsen)

`probabilityPercent` Up to percentage that the computer will give you an answer.
`restricted` This is a mode that the next word should not be said before.

## Note
Instead of a complete OOP, I used fully function based solution and FP approach.
Players are constructed as strings whereas Game are constructed as Objects.

## Structure
The game structure is built with React hooks. [index](./src/index.tsx) is the entrance file wrapped with 
[GameProvider](./src/context/GameProvider.tsx) which provides the state management through React Context. `useReducer` 
is used as a global state manager. Global state and reducer dispatcher are passed down the children via React Context and  
reached with context hook.

Preferences are kept in global state as game settings. So the game is depended on these preferences to determine some game logics.

Since the game is built with React hooks, Therefore; strongly got benefits from some fascinating react hooks.
That are `useEffect`,  `useCallback`, `useMemo`

The game is build upon 3 main custom hooks; [useGamePlay](./src/hooks/useGamePlay.ts), [usePlayer](./src/hooks/usePlayer.ts), [useWord](./src/hooks/useWord.ts)
and also three Players types that provide inputs; 'COMPUTER', 'AUTO_PLAY, 'HUMAN'. Let's examine
 the diagram which is prepared to explain the flow used in the game;

![Last letter diagram](./src/assets/last-letter.jpg?raw=true "Last letter diagram")

Game logics flow over [useGamePlay](./src/hooks/useGamePlay.ts) and distributed to callbacks of [usePlayer](./src/hooks/usePlayer.ts) and
[useWord](./src/hooks/useWord.ts).

`Players`'s inputs are in [InputWord](./src/presenters/game/inputs/InputWord.tsx) and the business logic of players 
changes considering player type.

## TODO
 - Change the global structure of the game
 - Tests

## Why useReducer ?
Since this is a small project, a normal global state can be stored using `useState` in [GameProvider](./src/context/GameProvider.tsx)
however, I decided to store game preferences as well, so a small global management state is needed here.
In other words, a better state management can be used here, but since we just have a couple of states, 
we can stick with `useReducer` etc.
