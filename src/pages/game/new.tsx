import API from 'api';
import Button from 'components/Button';
import { GAME_CODE_KEY } from 'app-constants';
import PageTitle from 'components/PageTitle';
import { useLocalStorage } from 'hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

const GameNewPage: React.FC = () => {
  const router = useRouter();
  const [, setCode] = useLocalStorage<string | null>(GAME_CODE_KEY, null);
  const [rounds, setRounds] = useState(1);
  const [players, setPlayers] = useState(2);

  const handleSubmit = async () => {
    try {
      const newGame = await API.createGame({ rounds, players });
      setCode(newGame.code);
      router.push({ pathname: '/game' });
    } catch (error) {
      console.warn('Unable to create game');
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen py-6 px-4 space-y-12 md:items-center md:justify-center md:space-y-24">
      <PageTitle>Create a new game</PageTitle>

      <form className="space-y-12">
        <div className="space-y-4">
          <label htmlFor="rounds" className="text-md block font-extrabold text-center text-white">
            How many rounds would you like to play?
          </label>
          <p className="text-4xl font-bold text-center text-white">{rounds} Rounds</p>
          <input
            type="range"
            min="1"
            max="10"
            value={rounds}
            onChange={({ target: { value } }) => setRounds(parseInt(value))}
            id="rounds"
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="players" className="text-md font-extrabold block text-center text-white">
            Set the amount of players
          </label>
          <p className="text-4xl font-bold text-center text-white">{players} Players</p>
          <input
            type="range"
            min="2"
            max="20"
            value={players}
            onChange={({ target: { value } }) => setPlayers(parseInt(value))}
            id="players"
            className="w-full"
          />
        </div>
      </form>

      <Button type="button" buttonText="Next" handleClick={handleSubmit} />
    </div>
  );
};

export default GameNewPage;
