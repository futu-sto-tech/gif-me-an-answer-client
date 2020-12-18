import { useState } from 'react';

const JoinGameScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    console.log('clicked');
  };

  return (
    <div className="flex flex-col items-center p-12 space-y-12">
      <h1 className="text-4xl font-bold text-white">Join Game</h1>
      <form className="space-y-12" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-center text-white">Game code</h2>
          <input
            className="px-4 py-2 text-2xl font-bold border-2 border-black rounded text-pink"
            type="text"
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

        <button type="submit">Play!</button>
      </form>
    </div>
  );
};

export default JoinGameScreen;
