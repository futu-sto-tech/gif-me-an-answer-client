import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import * as types from 'types';

const Navigation = styled.nav`
  height: 80px;
  padding: 24px;
  a {
    img {
      height: 70px;
    }
  }
`;

const MainContainer = styled.main`
  width: 90%;
  margin: 0 auto;
  flex: 1;
`;

interface IMainLayoutProps {
  currentRound?: types.GameRound;
  totalRounds?: number;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, currentRound, totalRounds }) => {
  const { pathname } = useRouter();

  return (
    <div className="flex flex-col h-screen">
      {pathname !== '/' ? (
        <Navigation className="flex space-x-4">
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
        </Navigation>
      ) : null}
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default MainLayout;
