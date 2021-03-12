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

const GameRound = styled.div`
  width: 55px;
  height: 55px;
  img {
    width: 100%;
  }
  p {
    margin-top: -43px;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
    font-size: 12px;
    span {
      font-size: 10px;
    }
  }
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
        <Navigation className="flex flex-shrink-0">
          <Link href="/">
            <a>
              <img src="/assets/Logo.png" alt="logo" />
            </a>
          </Link>
          {currentRound ? (
            <GameRound>
              <img src="/assets/round.svg" alt="logo" />
              <div>
                <p>
                  <span>Round</span> {currentRound.order + 1}/{totalRounds}
                </p>
              </div>
            </GameRound>
          ) : null}
        </Navigation>
      ) : null}
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default MainLayout;
