import { GAME_CODE_KEY, PLAYER_NAME_KEY } from 'app-constants';
import { useLocalStorage, useNextQueryParam } from 'hooks';

import API from 'api';
import Button from 'components/Button';
import { FormEvent, useEffect, useState } from 'react';

interface Props {
  onSetup: (data: { code: string; name: string }) => void;
}

const JoinGameScreen: React.FC<Props> = ({ onSetup }) => {
  const queryCode = useNextQueryParam('code');

  const [code, setCode] = useLocalStorage(GAME_CODE_KEY, queryCode || '');
  const [playerName, setPlayerName] = useLocalStorage(PLAYER_NAME_KEY, '');

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const handle = setTimeout(() => setIsError(false), 1000);
    return () => clearTimeout(handle);
  }, [isError]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const player = await API.joinGame(code, playerName, false);
      await API.markReadyForGame(code, player);
      onSetup({ code, name: playerName });
    } catch (error) {
      console.warn('Try again');
      setIsError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between py-12 md:items-center md:justify-start md:space-y-24"
    >
      <h1 className="text-4xl font-extrabold text-white text-center">Join Game</h1>
      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-center text-white">Game code</h2>
          <input
            className={`px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink w-full ${
              isError && 'animate-wiggle'
            }`}
            type="text"
            pattern="[0-9]{4}"
            required
            value={code}
            onChange={({ target: { value } }) => setCode(value)}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-center text-white">Name</h2>
          <input
            className="px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink w-full"
            type="text"
            required
            value={playerName}
            onChange={({ target: { value } }) => setPlayerName(value)}
          />
        </div>
      </div>

      <Button buttonText="Play!" type="submit" />
    </form>
  );
};

export default JoinGameScreen;
