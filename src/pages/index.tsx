import styled from 'styled-components';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const IndexPage: React.FC = () => {
  return (
    <>
      <h1 className="text-black dark:text-white">It&apos;s game time!</h1>
      <Title>Join and let&apos;s play!</Title>
    </>
  );
};

export default IndexPage;
