import { Game, Player } from 'types';
import { useEffect, useMemo, useState } from 'react';

import LinkButton from 'components/LinkButton';

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

  const winningPlayer = useMemo(() => game.players.sort((a, b) => (a.points > b.points ? -1 : 1))[0], [game.players]);

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
            <LinkButton href="/" linkText="Quit" />
            <LinkButton href="/game/new" linkText="Play again" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalWinnerScreen;
