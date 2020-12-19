import { DUMMY_GAME_DATA, DUMMY_PLAYER_DATA } from 'fixtures';

import FinalResultsScreen from '../../screens/final-results';

const ResultPage: React.FC = () => {
  return <FinalResultsScreen game={DUMMY_GAME_DATA} player={DUMMY_PLAYER_DATA} />;
};

export default ResultPage;
