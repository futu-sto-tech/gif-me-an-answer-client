import { DUMMY_GAME_DATA, DUMMY_PLAYER_DATA } from 'fixtures';
import { Game, GameRoundStatus } from 'types';
import { useEffect, useMemo, useState } from 'react';
import { useEventSource, useNextQueryParam } from 'hooks';

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
  const queryCode = useNextQueryParam('code');
  const [code, setCode] = useState<string | null>(queryCode || null);
  const [playerName, setPlayerName] = useState<string | null>(null);

  const game = useGameSubscription(code);
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

  if (game && player) {
    if (gameOver) {
      return <FinalWinnerScreen game={game} player={player} />;
    }

    if (latestRound) {
      switch (latestRound.status) {
        case GameRoundStatus.SELECT_GIF:
          return <BrowseScreen game={game} round={latestRound} />;
        case GameRoundStatus.VOTE:
          return null;
        case GameRoundStatus.PRESENT:
          return null;
        case GameRoundStatus.FINSIHED:
          return <FinalResultsScreen game={game} player={player} />;
      }
    }

    return <LobbyScreen game={game} />;
  }

  return <JoinGameScreen onSetup={handleSetup} />;
};

export default GamePage;
