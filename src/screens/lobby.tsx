import { useLocalStorage } from 'hooks';
import { PLAYER_NAME_KEY } from 'app-constants';
import Button from 'components/Button';
import { Game } from 'types';
import API from 'api';

const LobbyScreen: React.FC<{ game: Game }> = ({ game }) => {
  const [playerName] = useLocalStorage(PLAYER_NAME_KEY, '');

  const handleForceStart = async () => {
    try {
      await API.forceStart(game.code);
    } catch (error) {
      console.warn('Could not start game');
    }
  };

  function isPlayerHost() {
    const currentPlayer = game.players.find((player) => player.name === playerName);
    return currentPlayer?.isHost || false;
  }

  const showForceStartButton = game.players.length > 2 && isPlayerHost();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-6">
      <img src="/assets/bongocat-2.png" className="-mt-24" />
      <div className="space-y-2">
        <p className="text-lg font-bold text-white text-center md:text-2xl">Waiting for everyone to join...</p>
        <p className="text-lg font-bold text-white text-center md:text-2xl">
          {game.players.length} <small>/ {game.totalPlayers}</small> people have joined
        </p>
        <p className="text-lg font-bold text-gray-400 text-center md:text-2xl">{`Game code: ${game.code}`}</p>
        <ul>
          {game.players.map((item) => (
            <li key={item.id} className="text-gray-400 md:text-lg text-center">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-white">As a host, you can start the game even if not all players have joined</p>
      {showForceStartButton && <Button type="button" buttonText="Start game" handleClick={handleForceStart} />}
    </div>
  );
};

export default LobbyScreen;
