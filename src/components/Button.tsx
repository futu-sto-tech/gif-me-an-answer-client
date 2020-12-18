import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
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

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface IButtonProps {
  buttonText: string;
  handleClick?: () => void;
  type: ButtonType;
}

const Button: React.FC<IButtonProps> = ({ handleClick, buttonText, type }) => {
  return (
    <StyledButton
      type={type}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (handleClick) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {buttonText}
    </StyledButton>
  );
};

export default Button;
