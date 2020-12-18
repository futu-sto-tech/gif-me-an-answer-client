import Button from 'components/Button';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 50px;
`;

const IndexPage: React.FC = () => {
  return (
    <>
      <h1 className="text-pink">It&apos;s game time!</h1>
      <Title>Join and let&apos;s play!</Title>
      <Button buttonText="Join game" handleClick={() => console.log('join game')} type="button" />
      <Button buttonText="Join game" handleClick={() => console.log('join game')} type="button" />
    </>
  );
};

export default IndexPage;
