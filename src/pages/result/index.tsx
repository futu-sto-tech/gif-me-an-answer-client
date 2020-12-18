import FinalResultsScreen from '../../screens/final-results';

const DUMMY_GAME_DATA = {
  players: [
    { name: 'Hi', points: 22 },
    { name: 'John', points: 2 },
  ],
};

const ResultPage: React.FC = () => {
  return <FinalResultsScreen game={DUMMY_GAME_DATA} />;
};

export default ResultPage;
