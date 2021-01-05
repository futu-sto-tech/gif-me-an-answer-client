import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
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
  &:focus,
  &:disabled,
  &[disabled] {
    transform: translate(2px, 2px);

    background-color: ${({ theme }) => theme.colors.darkPink};
    box-shadow: 3px 3px #8d0066;
    background-color: ${({ theme }) => theme.colors.pink};

    outline: 1px solid transparent;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`;

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface IButtonProps {
  buttonText: string;
  handleClick?: () => void;
  type: ButtonType;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({ handleClick, buttonText, type, disabled }) => {
  return (
    <StyledButton
      type={type}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (handleClick) {
          e.preventDefault();
          handleClick();
        }
      }}
      disabled={disabled}
    >
      {buttonText}
    </StyledButton>
  );
};

export default Button;
