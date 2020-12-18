import { useEffect, useState } from 'react';
import { Dialog } from '@reach/dialog';
import Button from 'components/Button';
import { Gif } from 'types';

const BrowseScreen: React.FC<{ game: { players: [] } }> = () => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [gifs, setGifs] = useState<[Gif] | []>([]);

  const [secondsLeft, setSecondsLeft] = useState(60 * 2);

  useEffect(() => {
    const handle = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(handle);
  });

  return (
    <div className="flex flex-col items-center p-12 space-y-6">
      <div className="flex items-center justify-center w-24 h-24 text-2xl font-bold text-black bg-white rounded-full">
        {Math.floor(secondsLeft / 60)}:{secondsLeft - 60 * Math.floor(secondsLeft / 60)}
      </div>
      <div className="max-w-xl space-y-6">
        <p className="text-xl font-bold text-center text-white">
          When you randomly remember how much happier you were the week Pokemon GO came out
        </p>
        <input
          className="w-full px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink"
          type="text"
          required
          value={query}
          placeholder="Search for a gif by keyword or URL"
          onChange={({ target: { value } }) => setQuery(value)}
        />
      </div>
      <div className="gap-4 masonry">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <button key={item} onClick={() => setImage('https://media.giphy.com/media/VmthFMDlYu3F4mDEOD/giphy.gif')}>
            <img src="https://media.giphy.com/media/VmthFMDlYu3F4mDEOD/giphy.gif" />
          </button>
        ))}
        <img src="https://media.giphy.com/media/f6Q5qKS8zVF9qEQmnk/giphy.gif" />
      </div>

      <Dialog
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
