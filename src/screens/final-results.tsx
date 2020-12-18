import ResultChart from 'components/ResultChart';
import { useState } from 'react';
import { Game, Player } from 'types';

interface IFinalResultsScreenProps {
  game: Game;
  player: Player;
}

const FinalResultsScreen: React.FC<IFinalResultsScreenProps> = () => {
  const handleSubmit = () => {
    console.log('clicked ready for next round');
  };

  return (
    <div className="flex flex-col items-center p-12 space-y-12 h-screen">
      <h1 className="text-4xl font-bold text-white">The results are in</h1>
      <ResultChart />
      <form className="space-y-12" onSubmit={handleSubmit}>
        <button type="submit">Ready for next round</button>
      </form>
    </div>
  );
};

export default FinalResultsScreen;
