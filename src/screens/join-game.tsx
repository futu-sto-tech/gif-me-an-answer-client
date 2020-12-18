import Button from 'components/Button';
import { useState } from 'react';

interface Props {
  onSetup: (code: number) => void;
}

const JoinGameScreen: React.FC<Props> = ({ onSetup }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    onSetup(Number(code));
  };

  return (
    <div className="flex flex-col items-center p-12 space-y-12">
      <h1 className="text-4xl font-bold text-white">Join Game</h1>
      <form className="flex flex-col justify-center space-y-12" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-center text-white">Game code</h2>
          <input
            className="px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink"
            type="text"
            pattern="[0-9]{4}"
            required
            value={code}
            onChange={({ target: { value } }) => setCode(value)}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-center text-white">Name</h2>
          <input
            className="px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink"
            type="text"
            required
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
        </div>

        <Button buttonText="Play!" type="submit" />
      </form>
    </div>
  );
};

export default JoinGameScreen;
