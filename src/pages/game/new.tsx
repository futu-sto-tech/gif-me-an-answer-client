import API from 'api';
import Button from 'components/Button';
import { GAME_CODE_KEY } from 'app-constants';
import PageTitle from 'components/PageTitle';
import { useLocalStorage } from 'hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';

const GameNewPage: React.FC = () => {
  const router = useRouter();
  const [, setCode] = useLocalStorage<string | null>(GAME_CODE_KEY, null);
  const [rounds, setRounds] = useState(1);
  const [players, setPlayers] = useState(2);

  const handleSubmit = async () => {
    try {
      const newGame = await API.createGame({ rounds, players });
      setCode(newGame.code);
      router.push({ pathname: '/game' });
    } catch (error) {
      console.warn('Unable to create game');
    }
  };

  const containerLeftVariants = {
    initial: {
      x: -1000,
    },
    animate: {
      x: 0,
      transition: {
        type: 'spring',
        delay: 0.15,
        when: 'beforeChildren',
      },
    },
  };
  const containerRightVariants = {
    initial: {
      x: 1000,
    },
    animate: {
      x: 0,
      transition: {
        type: 'spring',
        delay: 0.15,
        when: 'beforeChildren',
        //staggeredChildren: 2 -> staggers aniamtion of children
      },
    },
  };

  const labelVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-col justify-between h-full py-6 space-y-12 md:items-center md:justify-center md:space-y-24">
      <PageTitle>Create a new game</PageTitle>

      <form className="space-y-12">
        <motion.div variants={containerLeftVariants} initial="initial" animate="animate" className="space-y-4">
          <motion.label
            variants={labelVariants}
            htmlFor="rounds"
            className="text-md block font-extrabold text-center text-white"
          >
            How many rounds would you like to play?
          </motion.label>
          <p className="text-4xl font-bold text-center text-white">{rounds} Rounds</p>
          <input
            type="range"
            min="1"
            max="10"
            value={rounds}
            onChange={({ target: { value } }) => setRounds(parseInt(value))}
            id="rounds"
            className="w-full"
          />
        </motion.div>

        <motion.div variants={containerRightVariants} initial="initial" animate="animate" className="space-y-4">
          <motion.label
            variants={labelVariants}
            htmlFor="players"
            className="text-md font-extrabold block text-center text-white"
          >
            Set the amount of players
          </motion.label>
          <p className="text-4xl font-bold text-center text-white">{players} Players</p>
          <input
            type="range"
            min="2"
            max="20"
            value={players}
            onChange={({ target: { value } }) => setPlayers(parseInt(value))}
            id="players"
            className="w-full"
          />
        </motion.div>
      </form>

      <Button type="button" buttonText="Next" handleClick={handleSubmit} />
    </div>
  );
};

export default GameNewPage;
