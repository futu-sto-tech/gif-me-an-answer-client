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
    <div className="flex flex-col items-center h-screen p-12 space-y-12">
      <h1 className="text-2xl font-bold text-white">{winningPlayers.length > 1 ? 'Winners' : 'Winner'}:</h1>

      <div className="flex flex-col items-center space-y-4">
        <img src="/assets/crown.svg" />

        {winningPlayers.map((item) => (
          <h1 key={item.id} className="text-4xl font-bold text-white text-center">
            {item.name}
          </h1>
        ))}

        <p className="text-pink-500 text-center text-lg font-bold">{winningScore} points</p>
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
