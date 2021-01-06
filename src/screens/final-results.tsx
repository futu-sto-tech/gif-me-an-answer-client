import API from 'api';
import Button from 'components/Button';
import ResultChart from 'components/ResultChart';
import { RoundScreenProps } from 'types';

const FinalResultsScreen: React.FC<RoundScreenProps> = ({ game, round, player }) => {
  const handleSubmit = async () => {
    console.log('clicked ready for next round');
    await API.markReadyForNextRound(game.code, round.order, player);
  };

  const resultData = round.images.map((image) => ({
    playerName: game.players.find((item) => item.id === image.playerId)?.name || 'Unknown',
    points: image.votes,
  }));

  return (
    <div className="flex flex-col items-center h-full py-12 space-y-12">
      <h1 className="text-4xl font-bold text-white">The results are in</h1>
      <ResultChart data={resultData} />
      <Button type="button" buttonText="Ready for next round" handleClick={handleSubmit} />
    </div>
  );
};

export default FinalResultsScreen;
