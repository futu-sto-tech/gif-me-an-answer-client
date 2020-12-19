import { Game, Gif } from 'types';
import { useEffect, useState } from 'react';

import Button from 'components/Button';
import { Dialog } from '@reach/dialog';
import { searchGifs } from './../api/endpoints';

const caption = 'When you randomly remember how much happier you were the week Pokemon GO came out';

const BrowseScreen: React.FC<{ game: Game }> = () => {
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
        const gifData = await searchGifs(value);
        setGifs(gifData);
      })();
    }
  }
  return (
    <div className="flex flex-col items-center p-12 space-y-6">
      <div className="flex items-center justify-center w-24 h-24 text-2xl font-bold text-black bg-white rounded-full">
        {Math.floor(secondsLeft / 60)}:{secondsLeft - 60 * Math.floor(secondsLeft / 60)}
      </div>
      <div className="max-w-xl space-y-6">
        <p className="text-xl font-bold text-center text-white">{caption} </p>
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
        {gifs &&
          gifs.map(({ original, id }) => {
            console.log(original.url);
            return (
              <button key={id} onClick={() => setImage(original.url)} className="w-full h-full">
                <img src={original.url} />
              </button>
            );
          })}
      </div>

      <Dialog
        aria-label="selected gif"
        className="flex flex-col items-center space-y-8 shadow-2xl bg-background rounded-xl"
        isOpen={image !== null}
        onDismiss={() => setImage(null)}
      >
        {image && <img src={image} className="border-4 border-black" />}
        <Button type="button" buttonText="Vote for GIF" />
      </Dialog>
    </div>
  );
};

export default BrowseScreen;
