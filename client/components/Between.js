import React, { useContext, useEffect, useState } from "react";
import { quotesp } from "../quotes";
import styles from "./css/Game.module.css";
import changeCubeStyles from "./css/LandingPage.module.css";
import { GameContext, GAME_ACTIONS } from "./context/game";
import { UserContext, USER_ACTIONS } from "./context/user";
import { SocketContext } from "./context/socket";
import { Container, Row, Button } from "react-materialize";

const Between = ({ submissionState, setSubmissionState }) => {
  const randomize = () => Math.floor(Math.random() * quotesp.length);

  const [idx, setIdx] = useState(randomize());
  const [wobble, setWobble] = useState(0);
  const socket = useContext(SocketContext);
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    if (submissionState !== 0) {
      setSubmissionState(0);
    }
  }, [submissionState]);

  const setGame = () => {
    const newGameState = {
      ...gameState,
      gameStatus: "playing",
      currentRound: gameState.currentRound + 1,
      roundComplete: false,
    };
    gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: newGameState });
    socket.emit("new-game-state", newGameState, userState.roomCode);
  };

  return (
    <Container className={styles.container}>
      <div>
        <div className={styles.profQuotes}>
          <br />"{quotesp[idx]}"<br /> <span>-Prof</span>
        </div>
        <Row className={changeCubeStyles.cubeImg}>
          <img
            src="/change_cube_transparent.png"
            wobble={wobble}
            onAnimationEnd={() => setWobble(0)}
            onClick={() => {
              setIdx(randomize());
              setWobble(1);
            }}
          />
        </Row>
        <Row hidden={gameState.roundComplete}>
          <Button onClick={setGame}>Next</Button>
        </Row>
      </div>
    </Container>
  );
};

export default Between;
