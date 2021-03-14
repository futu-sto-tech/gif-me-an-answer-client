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

  const winningScore = useMemo(() => game.players.map((item) => item.points).sort((a, b) => b - a)[0], [game.players]);
  const winningPlayers = useMemo(() => game.players.filter((item) => item.points === winningScore), [
    game.players,
    winningScore,
  ]);

  return (
    <div className="flex flex-col justify-between h-full py-6 space-y-6 md:space-y-12 md:py-24">
      <h1 className="text-lg text-center font-bold text-white">{winningPlayers.length > 1 ? 'Winners' : 'Winner'}:</h1>

      <div className="flex flex-col items-center space-y-4">
        <div>
          <img src="/assets/crown.svg" />
          <p className="text-pink-500 text-center text-lg font-bold">{winningScore} points</p>
        </div>

        {winningPlayers.map((item) => (
          <h1 key={item.id} className="text-4xl font-bold text-white text-center">
            {item.name}
          </h1>
        ))}
      </div>

      <div>
        <div className="flex flex-col items-center">
          <img src="/assets/bongocat-1.png" />
        </div>

        {shouldShowButtons && (
          <div className="grid gap-6 md:grid-cols-2 max-w-md mx-auto">
            <LinkButton href="/" linkText="Quit" />
            <LinkButton href="/" linkText="Play again" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalWinnerScreen;
