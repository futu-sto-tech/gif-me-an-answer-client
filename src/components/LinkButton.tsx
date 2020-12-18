import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledLink = styled.a`
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px 40px;
  border-radius: 6px;
  font-weight: 500;
  box-shadow: 5px 5px ${({ theme }) => theme.colors.darkPink};
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPink};
    box-shadow: none;
  }
  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.colors.darkPink};
    box-shadow: inset 5px 5px #8d0066;
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
