import { Gif, RoundScreenProps } from 'types';
import { useCallback, useEffect, useMemo, useState } from 'react';

import API from 'api';
import Button from 'components/Button';
import { Dialog } from '@reach/dialog';

const RANDOM_GIF_LIST = [
  'https://media.giphy.com/media/h26R1JMxiqYpwp0rkF/giphy.gif',
  'https://media.giphy.com/media/l4JyRqcDU93S334KQ/giphy.gif',
  'https://media.giphy.com/media/2YoRN2MrRKNTzg7LJb/giphy.gif',
];

function getRandomGif() {
  return RANDOM_GIF_LIST[Math.floor(Math.random() * RANDOM_GIF_LIST.length)];
}

const BrowseScreen: React.FC<RoundScreenProps> = ({ game, round, player }) => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [gifs, setGifs] = useState<[Gif] | null>(null);

  const handleSubmitGif = useCallback(
    async (url: string) => {
      await API.submitGif({ code: game.code, order: round.order, player, gifUrl: url });
    },
    [game.code, round.order, player],
  );

  const playerImage = useMemo(() => round.images.find((item) => item.playerId === player.id), [round, player]);

  const [secondsLeft, setSecondsLeft] = useState(60 * 2);

  useEffect(() => {
    const handle = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(handle);
  });

  useEffect(() => {
    if (secondsLeft < 0 && playerImage === undefined) {
      const randomGif = getRandomGif();
      handleSubmitGif(randomGif);
    }
  }, [secondsLeft, handleSubmitGif, playerImage]);

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      (async () => {
        const gifData = await API.searchGifs(value);
        setGifs(gifData);
      })();
    }
  }

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
        {gifs?.slice(0, 20).map(({ original, id }) => {
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
          <Button type="button" buttonText="Selected GIF" disabled={true} />
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
