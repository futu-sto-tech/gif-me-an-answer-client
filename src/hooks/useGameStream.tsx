import { useState, useEffect } from 'react';
import { Game } from 'types';

function useGameStream(gameCode?: number): Game | null {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (gameCode) {
      const events = new EventSource(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${gameCode}/events`);
      events.onmessage = (event) => {
        console.log('event: ', event.data);
        setGameState(JSON.parse(event.data));
      };
    }
  });

  return gameState;
}

export default useGameStream;
