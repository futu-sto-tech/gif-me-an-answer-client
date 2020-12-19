import { useEffect, useRef, useState } from 'react';

import BrowseScreen from 'screens/browse';
import { DUMMY_GAME_DATA } from 'fixtures';
import { Game } from 'types';
import JoinGameScreen from 'screens/join-game';
import LobbyScreen from 'screens/lobby';

function useEventSource<T>(url: string | null): T | null {
  const events = useRef<EventSource | null>();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (url) {
      events.current = new EventSource(url);
      events.current.addEventListener('message', (event) => {
        console.log(event);
        setData(event.data);
      });

      return () => events.current?.close();
    }

    return;
  }, [url]);

  return data;
}

const GamePage: React.FC = () => {
  const [code, setCode] = useState<number | null>(null);
  const game = useEventSource<Game>(code ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/games/${code}/event` : null);

  const handleGameSetup = (gameCode: number) => {
    setCode(gameCode);
  };

  if (game && game.rounds.length > 0) {
    return <BrowseScreen game={DUMMY_GAME_DATA} />;
  }

  if (code) {
    return <LobbyScreen game={DUMMY_GAME_DATA} />;
  }

  return <JoinGameScreen onSetup={handleGameSetup} />;
};

export default GamePage;
