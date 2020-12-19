import { Game, Player } from 'types';

import Button from 'components/Button';
import ResultChart from 'components/ResultChart';

interface IFinalResultsScreenProps {
  game: Game;
  player: Player;
}

const FinalResultsScreen: React.FC<IFinalResultsScreenProps> = ({ game }) => {
  const handleSubmit = () => {
    console.log('clicked ready for next round');
  };

  const resultData = game.players.map((p) => ({
    playerName: p.name,
    points: p.points,
  }));

  return (
    <div className="flex flex-col items-center h-screen p-12 space-y-12">
      <h1 className="text-4xl font-bold text-white">The results are in</h1>
      <ResultChart data={resultData} />
      <form className="space-y-12" onSubmit={handleSubmit}>
        <Button type="submit" buttonText="Ready for next round" />
      </form>
    </div>
  );
};

export default FinalResultsScreen;
