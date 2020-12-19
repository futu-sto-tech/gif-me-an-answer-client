import { DUMMY_GAME_DATA } from 'fixtures';
import JoinGameScreen from 'screens/join-game';
import LobbyScreen from 'screens/lobby';
import { useState } from 'react';

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
