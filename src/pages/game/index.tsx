<<<<<<< HEAD
import { Game, GameStatus } from 'types';

import JoinGameScreen from 'screens/join-game';
import LobbyScreen from 'screens/lobby';
import { useState } from 'react';

const DUMMY_GAME_DATA: Game = {
  code: 7856,
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
=======
import MainLayout from 'components/MainLayout';
import PageTitle from 'components/PageTitle';
import BrowseScreen from 'screens/browse';

const DUMMY_GAME_DATA = {
  players: [
    { name: 'Hi', points: 22 },
    { name: 'John', points: 2 },
  ],
};

const GamePage: React.FC = () => {
  return (
    <MainLayout>
      <PageTitle>Join game</PageTitle>
      <BrowseScreen game={DUMMY_GAME_DATA} />
    </MainLayout>
  );
>>>>>>> 0f7ee49... add giserch API
};

export default GamePage;
