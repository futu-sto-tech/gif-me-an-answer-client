import styled from 'styled-components';
import Link from 'next/link';

const Navigation = styled.nav`
  height: 80px;
  padding: 24px;
  img {
    height: 70px;
  }
`;

const MainContainer = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navigation className="flex  items-center justify-center ">
        <Link href="/">
          <a>
            <img src="/assets/logo.png" alt="logo" />
          </a>
        </Link>
      </Navigation>
      <MainContainer>{children}</MainContainer>
    </>
  );
};

export default MainLayout;
