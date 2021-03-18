import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import * as types from 'types';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 88px 1fr;
`;

interface IMainLayoutProps {
  currentRound?: types.GameRound;
  totalRounds?: number;
  onExit: () => void;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, currentRound, totalRounds, onExit }) => {
  const { pathname } = useRouter();

  return (
    <Container>
      {pathname !== '/' ? (
        <nav className="flex items-center h-full justify-between p-4">
          <div className="flex space-x-4 flex-shrink-0">
            <Link href="/">
              <a>
                <img src="/assets/Logo.png" style={{ height: 64 }} alt="logo" />
              </a>
            </Link>
            {currentRound ? (
              <div className="relative" style={{ width: 55, height: 55 }}>
                <img src="/assets/round.svg" height="55" width="55" alt="logo" />
                <div className="absolute inset-0 flex items-center justify-center flex-col space-y-1">
                  <p className="text-white text-center leading-none -mb-px" style={{ fontSize: 9 }}>
                    Round
                  </p>
                  <p className="text-center text-white text-sm leading-none">
                    {currentRound.order}/{totalRounds}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          {currentRound && (
            <button className="text-gray-400 hover:text-white" onClick={onExit}>
              Exit
            </button>
          )}
        </nav>
      ) : null}
      <div className="h-full px-4 overflow-y-scroll">{children}</div>
    </Container>
  );
};

export default MainLayout;
