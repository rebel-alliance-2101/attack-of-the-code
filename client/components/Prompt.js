import React from 'react';
import { demo } from '../../server/challenges';
import styles from './css/Game.module.css';

const Prompt = () => {
  return (
    <div className={styles.prompt}>
      <h2>challenge</h2>
      <div className={styles.challenge}>
        <p>{demo[0].prompt}</p>
      </div>
    </div>
  );
};

export default Prompt;