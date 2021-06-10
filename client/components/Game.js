import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import styles from './css/Game.module.css';
import editorStyles from './css/Editor.module.css';
import Prompt from './Prompt';
import CodePenClone from './CodePenClone';
import GameSetup from './GameSetup';
import { GameContext } from './context/game';

const Game = () => {
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [result, setResult] = useState('');
  const [gameState, setGameState] = useContext(GameContext);
  const runCode = () => {
    // console.log(js)
    setResult(eval(js));
    setSrcDoc(`
            <html>
              <style>
                * {
                  font-family: Verdana;
                }
              </style>
                <body>
                    <div id="result"></div>
                </body>
                <script>
                    const result = document.getElementById('result');
                    result.innerText = '${eval(js)}'
                </script>
            </html>
        `);
  };

  const checkCode = () => {
    if (result === 2) {
      alert('The answer was 2 you are correct');
    } else {
      alert('incorrect');
    }
  };

  const resetCode = () => {
    setJs('');
    setSrcDoc(`
            <html>
              <style>
                * {
                  font-family: Verdana;
                }
              </style>
                <body>
                    <div id="result"></div>
                </body>
                <script>
                    const result = document.getElementById('result');
                    result.innerText = ''
                </script>
            </html>
        `);
  };

  //console.log('result', result)

  useEffect(() => {
    // console.log(await axios.get('/api/gamedata/demo'));
    console.log('Game state', gameState);
  }, []);

  return (
    <div className={styles.game}>
      {gameState.gameStatus === 'setup' ? (
        <GameSetup />
      ) : (
        <div>
          <Prompt />
          <CodePenClone value={js} onChange={setJs} />
          <div className={editorStyles.runBtn}>
            <button onClick={runCode}>Run</button>
            <button onClick={checkCode}>Submit</button>
            <button onClick={resetCode}>Reset</button>
          </div>
          <div className={editorStyles.pane}>
            <iframe
              srcDoc={srcDoc}
              title='output'
              sandbox='allow-scripts'
              frameBorder='0'
              width='100%'
              height='100%'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
