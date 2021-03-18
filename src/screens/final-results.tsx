import ResultChart from 'components/ResultChart';
import { RoundScreenProps } from 'types';

const FinalResultsScreen: React.FC<RoundScreenProps> = ({ game, round, player }) => {
  const orderedImages = [...round.images].sort((a, b) => b.votes - a.votes);
  const topVotes = orderedImages[0].votes;
  const topImages = orderedImages.filter((item) => item.votes === topVotes);

  const resultData = orderedImages.map((image) => {
    const resultPlayer = game.players.find((item) => item.id === image.playerId);

    return {
      playerName: resultPlayer?.id === player.id ? 'You' : resultPlayer?.name || 'Unknown',
      points: image.votes,
    };
  });

  const isFinalRound = game.totalRounds === round.order;

  return (
    <div className="h-full py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center text-white">The results are in</h1>

      <div className="h-96">
        <ResultChart data={resultData} />
      </div>

      <section>
        {topImages.map((item) => (
          <div key={item.id} className="space-y-2">
            <p className="text-gray-300 text-center text-xl">
              Round winner:{' '}
              <span className="text-pink-500">{game.players.find((player) => player.id === item.playerId)?.name}</span>
            </p>
            <img src={item.url} className="mx-auto" />
          </div>
        ))}
      </section>

      {!isFinalRound && (
        <section>
          <h2 className="text-2xl font-bold text-white text-center">Leaderboard</h2>
          <ul className="list-decimal mx-auto max-w-md">
            {game.players
              .sort((a, b) => b.points - a.points)
              .map((item) => (
                <li key={item.id} className="text-gray-400 text-lg flex justify-between border-b border-gray-600 py-2">
                  <div>{item.name}</div>
                  <div>{item.points}</div>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default FinalResultsScreen;
