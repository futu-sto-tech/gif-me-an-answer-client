import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px 40px;
  border-radius: 6px;
  font-weight: 500;
  box-shadow: 5px 5px ${({ theme }) => theme.colors.darkPink};
  cursor: pointer;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px ${({ theme }) => theme.colors.darkPink};
  }

  &:active,
  &:focus {
    transform: translate(2px, 2px);

    background-color: ${({ theme }) => theme.colors.darkPink};
    box-shadow: 3px 3px #8d0066;
    background-color: ${({ theme }) => theme.colors.pink};

    outline: 1px solid transparent;
  }
`;

interface IButtonProps {
  href: string;
  linkText: string;
}

const LinkButton: React.FC<IButtonProps> = ({ linkText, href }) => {
  return (
    <Link href={href}>
      <StyledLink>{linkText}</StyledLink>
    </Link>
  );
};

export default LinkButton;
