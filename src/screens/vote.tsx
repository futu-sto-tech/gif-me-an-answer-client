import { Image, RoundScreenProps } from 'types';
import { useCallback, useMemo, useState } from 'react';

import API from 'api';
import Button from 'components/Button';
import Dialog from '@reach/dialog';

const VoteScreen: React.FC<RoundScreenProps> = ({ game, round, player }) => {
  const [image, setImage] = useState<Image | null>(null);
  const [voted, setVoted] = useState(false);

  const handleSubmit = useCallback(
    async (image: Image) => {
      try {
        setVoted(true);
        await API.vote(game.code, round.order, player, image.id);
      } catch (error) {
        console.warn(error);
        setVoted(false);
      }
    },
    [game.code, round.order, player],
  );

  const imagesToVoteFor = useMemo(() => round.images.filter((item) => item.playerId !== player.id), [
    player.id,
    round.images,
  ]);

  return (
    <div className="py-12 space-y-12">
      <h1 className="text-4xl font-extrabold text-center text-white">Time to vote!</h1>
      <p className="text-xl text-white font-extrabold text-center">{round.caption}</p>
      <div className="gap-4 masonry">
        {imagesToVoteFor.map((item) => (
          <button key={item.id} onClick={() => setImage(item)} className="w-full h-full">
            <img src={item.url} />
          </button>
        ))}
      </div>

      <Dialog
        aria-label="Selected GIF"
        className="p-6 bg-transparent w-full"
        isOpen={voted || image !== null}
        onDismiss={() => voted || setImage(null)}
      >
        {image && (
          <div className="space-y-8 px-4 py-8 shadow-2xl bg-background rounded-xl border-4 border-pink flex flex-col items-center max-w-lg mx-auto">
            <img src={image.url} className="border-4 border-black" />
            <Button
              type="button"
              buttonText={voted ? 'Voted' : 'Vote for GIF'}
              disabled={voted}
              handleClick={() => handleSubmit(image)}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default VoteScreen;
