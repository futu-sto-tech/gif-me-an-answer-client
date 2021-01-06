import { Game, GameRound, Player } from 'types';

interface ScreenProps {
  game: Game;
  round: GameRound;
  player: Player;
}

const PresentScreen: React.FC<ScreenProps> = ({ round }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl font-bold text-white">{round.caption}</p>
      </div>
      <img src={round.presentImage || '/assets/bongocat-2.png'} />
    </div>
  );
};

export default PresentScreen;
