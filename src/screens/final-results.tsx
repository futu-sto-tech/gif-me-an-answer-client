import ResultChart from 'components/ResultChart';
import { RoundScreenProps } from 'types';

const FinalResultsScreen: React.FC<RoundScreenProps> = ({ game, round, player }) => {
  const resultData = round.images.map((image) => {
    const resultPlayer = game.players.find((item) => item.id === image.playerId);

    return {
      playerName: resultPlayer?.id === player.id ? 'You' : resultPlayer?.name || 'Unknown',
      points: image.votes,
    };
  });

  return (
    <div className="flex flex-col items-center h-full py-12 space-y-12">
      <h1 className="text-4xl font-bold text-white">The results are in</h1>
      <ResultChart data={resultData} />
    </div>
  );
};

export default FinalResultsScreen;
