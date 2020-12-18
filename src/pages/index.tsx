import Button from 'components/Button';
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
        <Button buttonText="Join game" handleClick={() => console.log('join game')} type="button" />
        <Button buttonText="Host game" handleClick={() => console.log('join game')} type="button" />
      </div>
    </MainContainer>
  );
};

export default IndexPage;
