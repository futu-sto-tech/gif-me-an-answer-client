import { Gif, RoundScreenProps } from 'types';
import { useCallback, useEffect, useMemo, useState } from 'react';

import API from 'api';
import Button from 'components/Button';
import { Dialog } from '@reach/dialog';
import useDebounce from 'hooks';

const RANDOM_GIF_LIST = [
  'https://media.giphy.com/media/h26R1JMxiqYpwp0rkF/giphy.gif',
  'https://media.giphy.com/media/l4JyRqcDU93S334KQ/giphy.gif',
  'https://media.giphy.com/media/2YoRN2MrRKNTzg7LJb/giphy.gif',
];

function getRandomGif() {
  return RANDOM_GIF_LIST[Math.floor(Math.random() * RANDOM_GIF_LIST.length)];
}

const TOTAL_SECONDS = 60 * 2;

const BrowseScreen: React.FC<RoundScreenProps> = ({ game, round, player }) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 1500);
  const [image, setImage] = useState<string | null>(null);
  const [gifs, setGifs] = useState<Gif[] | null>(null);

  const handleSubmitGif = useCallback(
    async (url: string) => {
      await API.submitGif({ code: game.code, order: round.order, player, gifUrl: url });
    },
    [game.code, round.order, player],
  );

  const playerImage = useMemo(() => round.images.find((item) => item.playerId === player.id), [round, player]);

  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const percentageLeft = (secondsLeft / TOTAL_SECONDS) * 100;

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
      updateGifImages(value);
    }
  }

  const updateGifImages = useCallback(async (query: string) => {
    const gifData = await API.searchGifs(query);
    setGifs(gifData);
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      updateGifImages(debouncedValue);
    } else {
      setGifs([]);
    }
  }, [updateGifImages, debouncedValue]);

  return (
    <>
      <div className="fixed h-2 bg-pink-500 top-0 left-0" style={{ width: `${percentageLeft}%` }} />
      <div className="flex flex-col items-center py-6 space-y-6">
        <div className="w-full max-w-xl space-y-6">
          <p className="text-xl font-bold text-center text-white">{round.caption} </p>
          <input
            className="w-full px-4 py-2 text-lg font-bold border-2 border-black rounded text-pink"
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
          <Dialog aria-label="selected gif" className="p-6 bg-transparent w-full" isOpen={true}>
            <div className="space-y-8 px-4 py-8 shadow-2xl bg-background rounded-xl border-4 border-pink flex flex-col items-center max-w-lg mx-auto">
              <img src={playerImage.url} className="border-4 border-black" />
              <Button type="button" buttonText="Selected GIF" disabled={true} />
            </div>
          </Dialog>
        ) : (
          <Dialog
            aria-label="selected gif"
            className="p-6 bg-transparent w-full"
            isOpen={image !== null}
            onDismiss={() => setImage(null)}
          >
            {image && (
              <div className="space-y-8 px-4 py-8 shadow-2xl bg-background rounded-xl border-4 border-pink flex flex-col items-center max-w-lg mx-auto">
                <img src={image} className="border-4 border-black" />
                <Button type="button" buttonText="Select GIF" handleClick={() => handleSubmitGif(image)} />
              </div>
            )}
          </Dialog>
        )}
      </div>
    </>
  );
};

export default BrowseScreen;
