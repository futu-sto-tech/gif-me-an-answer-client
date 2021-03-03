import { GAME_CODE_KEY, PLAYER_NAME_KEY } from 'app-constants';
import { Game, GameRoundStatus } from 'types';
import { useEffect, useMemo, useState } from 'react';
import { useEventSource, useLocalStorage } from 'hooks';

import API from 'api';
import BrowseScreen from 'screens/browse';
import FinalResultsScreen from 'screens/final-results';
import FinalWinnerScreen from 'screens/final-winner';
import JoinGameScreen from 'screens/join-game';
import LobbyScreen from 'screens/lobby';
import PresentScreen from 'screens/present';
import VoteScreen from 'screens/vote';

function useGameSubscription(code: string | null): Game | null {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    async function fetchInitialGame() {
      if (code) {
        const initialGame = await API.findGame(code);
        setGame(initialGame);
      }
    }

    fetchInitialGame();
  }, [code]);

  const gameSub = useEventSource<Game>(code ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/games/${code}/events` : null);
  useEffect(() => setGame(gameSub), [gameSub]);

  return game;
}

const GamePage: React.FC = () => {
  const [code, setCode] = useLocalStorage<string | null>(GAME_CODE_KEY, null);
  const [playerName, setPlayerName] = useLocalStorage<string | null>(PLAYER_NAME_KEY, null);

  const game = useGameSubscription(code);
  const player = useMemo(() => game?.players.find((item) => item.name === playerName) ?? null, [game, playerName]);

  const handleSetup = (data: { code: string; name: string }) => {
    setCode(data.code);
    setPlayerName(data.name);
  };

  const latestRound = useMemo(() => {
    const activeRound = game?.rounds.find((item) => item.status !== GameRoundStatus.FINISHED);

    if (activeRound?.status === GameRoundStatus.NOT_STARTED) {
      return game?.rounds
        .slice()
        .reverse()
        .find((item) => item.status === GameRoundStatus.FINISHED);
    }

    return activeRound;
  }, [game?.rounds]);

  const gameOver = useMemo(() => game?.rounds.every((item) => item.status === GameRoundStatus.FINISHED), [game]);

  if (game && player) {
    if (gameOver) {
      return <FinalWinnerScreen game={game} player={player} />;
    }

    if (latestRound) {
      switch (latestRound.status) {
        case GameRoundStatus.SELECT_GIF:
          return <BrowseScreen game={game} round={latestRound} player={player} />;
        case GameRoundStatus.VOTE:
          return <VoteScreen game={game} round={latestRound} player={player} />;
        case GameRoundStatus.PRESENT:
          return <PresentScreen game={game} round={latestRound} player={player} />;
        case GameRoundStatus.FINISHED:
          return <FinalResultsScreen game={game} player={player} round={latestRound} />;
        default:
          throw new Error(`Latest round should never have this status: ${latestRound.status}`);
      }
    }

    return <LobbyScreen game={game} />;
  }

  return <JoinGameScreen onSetup={handleSetup} />;
};

export default GamePage;
