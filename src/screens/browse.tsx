import { Game, GameRound, Gif, Player } from 'types';
import { useEffect, useMemo, useState } from 'react';

import API from 'api';
import Button from 'components/Button';
import { Dialog } from '@reach/dialog';

interface ScreenProps {
  game: Game;
  round: GameRound;
  player: Player;
}

const BrowseScreen: React.FC<ScreenProps> = ({ game, round, player }) => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [gifs, setGifs] = useState<[Gif] | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(60 * 2);

  useEffect(() => {
    const handle = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(handle);
  });

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      (async () => {
        const gifData = await API.searchGifs(value);
        setGifs(gifData);
      })();
    }
  }

  const handleSubmitGif = async (url: string) => {
    await API.submitGif({ code: game.code, order: round.order, player, gifUrl: url });
  };

  const playerImage = useMemo(() => round.images.find((item) => item.playerId === player.id), [round, player]);

  return (
    <div className="flex flex-col items-center p-12 space-y-6">
      <div className="flex items-center justify-center w-24 h-24 text-2xl font-bold text-black bg-white rounded-full">
        {Math.floor(secondsLeft / 60)}:{secondsLeft - 60 * Math.floor(secondsLeft / 60)}
      </div>
      <div className="w-full max-w-xl space-y-6">
        <p className="text-xl font-bold text-center text-white">{round.caption} </p>
        <input
          className="w-full px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink"
          type="text"
          required
          value={value}
          placeholder="Search for a gif by keyword or URL"
          onChange={({ target: { value } }) => setValue(value)}
          onKeyPress={handleSearch}
        />
      </div>
      <div className="gap-4 masonry">
        {gifs?.map(({ original, id }) => {
          console.log(original.url);
          return (
            <button key={id} onClick={() => setImage(original.url)} className="w-full h-full">
              <img src={original.url} />
            </button>
          );
        })}
      </div>

      {playerImage ? (
        <Dialog
          aria-label="selected gif"
          className="flex flex-col items-center space-y-8 shadow-2xl bg-background rounded-xl"
          isOpen={true}
        >
          <img src={playerImage.url} className="border-4 border-black" />
          <Button type="button" buttonText="Selected GIF" />
        </Dialog>
      ) : (
        <Dialog
          aria-label="selected gif"
          className="flex flex-col items-center space-y-8 shadow-2xl bg-background rounded-xl"
          isOpen={image !== null}
          onDismiss={() => setImage(null)}
        >
          {image && (
            <>
              <img src={image} className="border-4 border-black" />
              <Button type="button" buttonText="Select GIF" handleClick={() => handleSubmitGif(image)} />
            </>
          )}
        </Dialog>
      )}
    </div>
  );
};

export default BrowseScreen;
