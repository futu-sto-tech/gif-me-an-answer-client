import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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

const MainLayout: React.FC = ({ children }) => {
  const roundNumber = 1;
  const totalRounds = 3;
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <div className="flex flex-col h-screen">
      {pathname !== '/' ? (
        <Navigation className="flex flex-shrink-0">
          <Link href="/">
            <a>
              <img src="/assets/logo.png" alt="logo" />
            </a>
          </Link>
          <GameRound>
            <img src="/assets/round.svg" alt="logo" />
            <div>
              <p>
                <span>Round</span> {roundNumber}/{totalRounds}
              </p>
            </div>
          </GameRound>
        </Navigation>
      ) : null}
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default MainLayout;
