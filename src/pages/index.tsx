import API from 'api';
import LinkButton from 'components/LinkButton';
import styled from 'styled-components';

const MainContainer = styled.main`
  width: 60%;
  margin: 0 auto;
`;

const IndexPage: React.FC = () => {
  return (
    <MainContainer className="flex flex-col items-center justify-center h-screen">
      <img src="/assets/bongocat-1.png" alt="moscot cat" />
      <img src="/assets/logo.png" alt="logo" className="mb-9" />
      <div className="grid gap-8 lg:grid-cols-2">
        <LinkButton linkText="Join game" href="/game/" />
        <LinkButton linkText="Host game" href="/game/new" />
      </div>
    </MainContainer>
  );
};

export default IndexPage;
