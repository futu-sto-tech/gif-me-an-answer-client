import API from 'api';
import MainLayout from 'components/MainLayout';
import PageTitle from 'components/PageTitle';
import { useEffect, useState } from 'react';
import { Game } from 'types';

const GameNewPage: React.FC = () => {
  const [game, setGame] = useState<Game>();
  useEffect(() => {
    API.createGame(4).then(function (newGame) {
      console.log(newGame);
      setGame(newGame);
    });
  }, []);

  return (
    <MainLayout>
      <PageTitle>Create a new game</PageTitle>
      {game == undefined ? <p> Creating game</p> : <p>Code is {game?.code}</p>}
    </MainLayout>
  );
};

export default GameNewPage;
