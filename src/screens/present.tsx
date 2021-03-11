import { RoundScreenProps } from 'types';

const PresentScreen: React.FC<RoundScreenProps> = ({ round }) => {
  return (
    <div className="space-y-12 py-6 md:py-12">
      <p className="text-2xl font-bold text-center text-white">{round.caption}</p>
      <img src={round.presentImage || '/assets/bongocat-2.png'} />
    </div>
  );
};

export default PresentScreen;
