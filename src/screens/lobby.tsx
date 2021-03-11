import { Game } from 'types';

const LobbyScreen: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-6">
      <img src="/assets/bongocat-2.png" className="-mt-24" />
      <div className="space-y-2">
        <p className="text-lg font-bold text-white text-center md:text-2xl">{game.players.length} people have joined</p>
        <p className="text-lg font-bold text-white text-center md:text-2xl">Waiting for everyone to join...</p>
      </div>
    </div>
  );
};

export default LobbyScreen;
