import API from 'api';
import Button from 'components/Button';
import { Game } from 'types';
import PageTitle from 'components/PageTitle';
import { useState } from 'react';

const GameNewPage: React.FC = () => {
  const [game, setGame] = useState<Game>();

  const handleSubmit = async () => {
    try {
      const newGame = await API.createGame({ rounds: 5, players: 8 });
      setGame(newGame);
    } catch (error) {
      console.warn('Unable to create game');
    }
  };

  return (
    <>
      <PageTitle>Create a new game</PageTitle>
      <Button type="button" buttonText="Next" handleClick={handleSubmit} />
      {/* Placeholder TO-DO */}
      {game == undefined ? <p> Creating game</p> : <p>Code is {game?.code}</p>}
    </>
  );
};

export default GameNewPage;
