import { Game, GameStatus } from 'types';

import JoinGameScreen from 'screens/join-game';
import LobbyScreen from 'screens/lobby';
import { useState } from 'react';

const DUMMY_GAME_DATA: Game = {
  code: '7856',
  players: [],
  status: GameStatus.ACTIVE,
  totalRounds: 8,
  rounds: [],
};

const GamePage: React.FC = () => {
  const [code, setCode] = useState<number | null>(null);

  const handleGameSetup = (gameCode: number) => {
    setCode(gameCode);
  };

  if (code) {
    return <LobbyScreen game={DUMMY_GAME_DATA} />;
  }

  return <JoinGameScreen onSetup={handleGameSetup} />;
};

export default GamePage;
