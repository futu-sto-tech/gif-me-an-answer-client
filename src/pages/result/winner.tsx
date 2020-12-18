import React from 'react';
import FinalWinnerScreen from '../../screens/final-winner';

const DUMMY_GAME_DATA = {
  players: [
    { name: 'Hi', points: 22 },
    { name: 'John', points: 2 },
  ],
};

const WinnerPage: React.FC = () => {
  return <FinalWinnerScreen game={DUMMY_GAME_DATA} />;
};

export default WinnerPage;
