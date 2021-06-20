import React, { createContext, useReducer, useMemo } from 'react';

export const GameContext = createContext();

export const GAME_ACTIONS = {
  SET_GAME: 'SET_GAME',
};

const initialState = {
  timeLimit: 90,
  gameStatus: 'setup', //playing, between, gameover
  level: 'demo',
  totalRounds: 2,
  challenges: [],
  currentRound: 0,
  roundComplete: false
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case GAME_ACTIONS.SET_GAME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialState);

  const contextProvider = useMemo(() => {
    return { gameState, gameDispatch };
  }, [gameState, gameDispatch]);

  return (
    <GameContext.Provider value={contextProvider}>
      {children}
    </GameContext.Provider>
  );
};
