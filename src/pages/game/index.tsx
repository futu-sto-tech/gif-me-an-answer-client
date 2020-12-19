import { DUMMY_GAME_DATA, DUMMY_PLAYER_DATA } from 'fixtures';
import { Game, GameRoundStatus } from 'types';
import { useMemo, useState } from 'react';

import BrowseScreen from 'screens/browse';
import FinalResultsScreen from 'screens/final-results';
import FinalWinnerScreen from 'screens/final-winner';
import JoinGameScreen from 'screens/join-game';
import LobbyScreen from 'screens/lobby';
import { useEventSource } from 'hooks';

const GamePage: React.FC = () => {
  const [code, setCode] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);

  const game = useEventSource<Game>(code ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/games/${code}/events` : null);
  const player = useMemo(() => game?.players.find((item) => item.name === playerName) ?? null, [game, playerName]);

  const handleSetup = (data: { code: string; name: string }) => {
    setCode(data.code);
    setPlayerName(data.name);
  };

  const latestRound = useMemo(() => game?.rounds[game.rounds.length - 1], [game?.rounds]);

  const gameOver = useMemo(() => {
    if (game) {
      const allRounds = game.rounds.length === game.totalRounds;
      const allFinished = game.rounds.every((item) => item.status === GameRoundStatus.FINSIHED);
      return allRounds && allFinished;
    }
  }, [game]);

  if (gameOver) {
    return <FinalWinnerScreen game={DUMMY_GAME_DATA} player={DUMMY_PLAYER_DATA} />;
  }

  if (latestRound) {
    switch (latestRound.status) {
      case GameRoundStatus.SELECT_GIF:
        return <BrowseScreen game={DUMMY_GAME_DATA} />;
      case GameRoundStatus.VOTE:
        return null;
      case GameRoundStatus.PRESENT:
        return null;
      case GameRoundStatus.FINSIHED:
        return <FinalResultsScreen game={DUMMY_GAME_DATA} player={DUMMY_PLAYER_DATA} />;
    }
  }

  if (player !== null) {
    return <LobbyScreen game={DUMMY_GAME_DATA} />;
  }

  return <JoinGameScreen onSetup={handleSetup} />;
};

export default GamePage;
