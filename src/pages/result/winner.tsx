import { DUMMY_GAME_DATA, DUMMY_PLAYER_DATA } from 'fixtures';

import FinalWinnerScreen from '../../screens/final-winner';
import React from 'react';

const WinnerPage: React.FC = () => {
  return <FinalWinnerScreen game={DUMMY_GAME_DATA} player={DUMMY_PLAYER_DATA} />;
};

export default WinnerPage;
