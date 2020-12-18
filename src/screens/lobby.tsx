const LobbyScreen: React.FC<{ game: { players: [] } }> = ({ game }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-12 space-y-12">
      <img src="/assets/bongocat-2.png" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl font-bold text-white">{game.players.length} people have joined</p>
        <p className="text-2xl font-bold text-white">Waiting for everyone to join...</p>
      </div>
    </div>
  );
};

export default LobbyScreen;
