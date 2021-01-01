import API from 'api';
import Button from 'components/Button';
import { GAME_CODE_KEY } from 'app-constants';
import PageTitle from 'components/PageTitle';
import { useLocalStorage } from 'hooks';
import { useRouter } from 'next/router';

const GameNewPage: React.FC = () => {
  const router = useRouter();
  const [, setCode] = useLocalStorage<string | null>(GAME_CODE_KEY, null);

  const handleSubmit = async () => {
    try {
      const newGame = await API.createGame({ rounds: 5, players: 8 });
      setCode(newGame.code);
      router.push({ pathname: '/game' });
    } catch (error) {
      console.warn('Unable to create game');
    }
  };

  return (
    <>
      <PageTitle>Create a new game</PageTitle>
      <Button type="button" buttonText="Next" handleClick={handleSubmit} />
    </>
  );
};

export default GameNewPage;
