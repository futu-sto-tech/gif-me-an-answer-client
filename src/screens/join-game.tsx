import { GAME_CODE_KEY, PLAYER_NAME_KEY } from 'app-constants';
import { useLocalStorage, useNextQueryParam } from 'hooks';

import API from 'api';
import Button from 'components/Button';
import { FormEvent } from 'react';

interface Props {
  onSetup: (data: { code: string; name: string }) => void;
}

const JoinGameScreen: React.FC<Props> = ({ onSetup }) => {
  const queryCode = useNextQueryParam('code');

  const [code, setCode] = useLocalStorage(GAME_CODE_KEY, queryCode || '');
  const [playerName, setPlayerName] = useLocalStorage(PLAYER_NAME_KEY, '');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await API.joinGame(code, playerName);
      onSetup({ code, name: playerName });
    } catch (error) {
      console.warn('Try again');
    }
  };

  return (
    <div className="flex flex-col items-center p-12 space-y-12">
      <h1 className="text-4xl font-bold text-white">Join Game</h1>
      <form className="flex flex-col justify-center space-y-12" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-center text-white">Game code</h2>
          <input
            className="px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink"
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
            className="px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink"
            type="text"
            required
            value={playerName}
            onChange={({ target: { value } }) => setPlayerName(value)}
          />
        </div>

        <Button buttonText="Play!" type="submit" />
      </form>
    </div>
  );
};

export default JoinGameScreen;
