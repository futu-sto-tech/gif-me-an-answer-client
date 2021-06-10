import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RoundSVG } from './RoundSvg';

const Navigation = styled.nav`
  height: 80px;
  margin: 24px;
  display: flex;
  a {
    img {
      height: 100%;
    }
  }
`;

const MainContainer = styled.main`
  width: 90%;
  margin: 0 auto;
  flex: 1;
`;

const GameRound = styled.div`
  display: flex;
  height: 100%;
  margin-left: 16px;
  position: relative;
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
  svg {
    position: absolute;
  }
`;
const TextContainer = styled.div`
  color: white;
`;

const MainLayout: React.FC = ({ children }) => {
  const roundNumber = 1;
  const totalRounds = 3;
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <div className="flex flex-col h-screen">
      {pathname !== '/' ? (
        <Navigation>
          <Link href="/">
            <a>
              <img src="/assets/Logo.png" alt="logo" />
            </a>
          </Link>
          <GameRound>
            <RoundSVG />
            <TextContainer>
              {roundNumber}/{totalRounds}
            </TextContainer>
          </GameRound>
        </Navigation>
      ) : null}
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default MainLayout;
