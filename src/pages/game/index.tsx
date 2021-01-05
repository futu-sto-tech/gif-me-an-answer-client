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

function useGameSubscription(code: string | null): Game | null {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    async function fetchInitialGame() {
      if (code) {
        const initialGame = await API.findGames(code);
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

  const latestRound = useMemo(() => game?.rounds.find((item) => item.status !== GameRoundStatus.NOT_STARTED), [
    game?.rounds,
  ]);

  const gameOver = useMemo(() => game?.rounds.every((item) => item.status === GameRoundStatus.FINSIHED), [game]);

  if (game && player) {
    if (gameOver) {
      return <FinalWinnerScreen game={game} player={player} />;
    }

    if (latestRound) {
      switch (latestRound.status) {
        case GameRoundStatus.SELECT_GIF:
          return <BrowseScreen game={game} round={latestRound} player={player} />;
        case GameRoundStatus.VOTE:
          return null;
        case GameRoundStatus.PRESENT:
          return null;
        case GameRoundStatus.FINSIHED:
          return <FinalResultsScreen game={game} player={player} />;
        default:
          throw new Error(`Latest round should never have this status: ${latestRound.status}`);
      }
    }

    return <LobbyScreen game={game} />;
  }

  return <JoinGameScreen onSetup={handleSetup} />;
};

export default GamePage;
