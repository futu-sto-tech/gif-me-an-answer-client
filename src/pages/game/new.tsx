import API from 'api';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import { useRouter } from 'next/router';

const GameNewPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const newGame = await API.createGame({ rounds: 5, players: 8 });
      router.push({ pathname: '/game', query: { code: newGame.code } });
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
