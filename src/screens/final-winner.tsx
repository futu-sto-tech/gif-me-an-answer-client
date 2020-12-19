import { Game, Player } from 'types';
import { useEffect, useState } from 'react';

import Button from 'components/Button';

interface IFinalWinnerScreenProps {
  game: Game;
  player: Player;
}

const FinalWinnerScreen: React.FC<IFinalWinnerScreenProps> = ({ game }) => {
  const [shouldShowButtons, setShouldShowButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShouldShowButtons(true);
    }, 5000);
  }, []);

  const handleQuit = () => {
    console.log('quit');
  };

  const handleAgain = () => {
    console.log('again');
  };

  const winnerPoints = Math.max(...game.players.map((p) => p.points));
  const winningPlayer = game.players.find((gamePlayer) => (gamePlayer.points = winnerPoints));

  return (
    <div className="flex flex-col items-center h-screen p-12 space-y-12">
      <h1 className="text-2xl font-bold text-white">Winner:</h1>

      <div className="flex flex-col items-center">
        <img src="/assets/crown.svg" />
        <h1 className="text-4xl font-bold text-white">{winningPlayer?.name}</h1>
      </div>

      <div>
        <div className="flex flex-col items-center">
          <img src="/assets/bongocat-1.png" />
        </div>

        {shouldShowButtons && (
          <div className="flex items-center justify-between space-x-6">
            <Button type="button" handleClick={handleQuit} buttonText="Quit" />

            <Button type="button" handleClick={handleAgain} buttonText="Again" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalWinnerScreen;
