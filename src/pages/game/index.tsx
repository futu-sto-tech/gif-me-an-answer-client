import { GAME_CODE_KEY, PLAYER_NAME_KEY } from 'app-constants';
import { Game, GameRound, GameRoundStatus, GameStatus, Player } from 'types';
import React, { useEffect, useMemo, useState } from 'react';
import { useEventSource, useLocalStorage } from 'hooks';

import API from 'api';
import BrowseScreen from 'screens/browse';
import FinalResultsScreen from 'screens/final-results';
import FinalWinnerScreen from 'screens/final-winner';
import JoinGameScreen from 'screens/join-game';
import LobbyScreen from 'screens/lobby';
import PresentScreen from 'screens/present';
import VoteScreen from 'screens/vote';
import MainLayout from 'components/MainLayout';

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

const getCurrentScreen = (game?: Game | null, player?: Player | null, latestRound?: GameRound) => {
  if (!game || !player) {
    return;
  }

  if (game.status === GameStatus.FINISHED) {
    return <FinalWinnerScreen game={game} player={player} />;
  }

  if (latestRound) {
    switch (latestRound.status) {
      case GameRoundStatus.NOT_STARTED:
        return <LobbyScreen game={game} />;
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

  console.error(`Unexpected screen state`, game, latestRound);
  throw new Error('Unexpected screen state!');
};

const GamePage: React.FC = () => {
  const [code, setCode] = useLocalStorage<string | null>(GAME_CODE_KEY, null);
  const [playerName, setPlayerName] = useLocalStorage<string | null>(PLAYER_NAME_KEY, null);

  const game = useGameSubscription(code);
  const player = useMemo(() => game?.players.find((item) => item.name === playerName) ?? null, [game, playerName]);

  const handleSetup = (data: { code: string; name: string }) => {
    setCode(data.code);
    setPlayerName(data.name);
  };

  const latestRound = useMemo(() => game?.rounds.find((item) => item.order === game?.currentRound), [
    game?.rounds,
    game?.currentRound,
  ]);

  const screen = getCurrentScreen(game, player, latestRound) || <JoinGameScreen onSetup={handleSetup} />;

  return (
    <MainLayout currentRound={latestRound} totalRounds={game?.totalRounds}>
      {screen}
    </MainLayout>
  );
};

export default GamePage;
