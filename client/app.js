import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { CombinedContextProvider } from './components/context';
import Loading from './components/Loading';

const App = () => {
  const userFromSessionStorage = JSON.parse(
    window.sessionStorage.getItem('user')
  );

  const [userState, setUserState] = useState({
    avatar: '',
    playerName: '',
    roomCode: '',
    score: 0,
    submitted: false,
  });

  const [gameState, setGameState] = useState({
    timeLimit: 90,
    gameStatus: 'setup', //playing, between, gameover
    level: 'demo',
    round: 1,
  });

  const [view, setView] = useState({
    loading: true,
    background: '',
    font: '',
  });

  useEffect(() => {
    setTimeout(() => setView({ loading: false }), 2000);
  }, []);


  return view.loading ? (
    <Loading />
  ) : (
    <CombinedContextProvider
      userProfs={[userState, setUserState]}
      gameProfs={[gameState, setGameState]}
      viewProfs={[view, setView]}
    >
      {userState?.roomCode || userFromSessionStorage?.roomCode ? (
        <GameContainer />
      ) : (
        <LandingPage />
      )}
    </CombinedContextProvider>
  );
};

export default App;
