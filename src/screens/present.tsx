import { RoundScreenProps } from 'types';

const PresentScreen: React.FC<RoundScreenProps> = ({ round }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl font-bold text-white">{round.caption}</p>
      </div>
      <img src={round.presentImage || '/assets/bongocat-2.png'} />
    </div>
  );
};

export default PresentScreen;
