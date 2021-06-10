import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledLink = styled(motion.a)`
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px 40px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;

  &:active,
  &:focus {
    transform: translate(2px, 2px);
    background-color: ${({ theme }) => theme.colors.darkPink};
    background-color: ${({ theme }) => theme.colors.pink};
    outline: 1px solid transparent;
  }
`;

interface IButtonProps {
  href: string;
  linkText: string;
}

const LinkButton: React.FC<IButtonProps> = ({ linkText, href }) => {
  const glowVariants = {
    hover: {
      //use array for keyframes
      scale: 1.05,
      boxShadow: '7px 7px 5px #8D0066',
      transform: 'translate(-2px, -2px)',
      transition: { yoyo: 2 },
      // transition: { yoyo: Infinity },
    },
    initial: {
      scale: 1,
      boxShadow: '5px 5px 0px #8D0066',
    },
  };

  const textVariants = {
    hover: {
      textShadow: '2px 2px 5px #8D0066',
      transition: {
        ease: 'easeOut',
        delay: 0.15,
        duration: 0.5,
      },
    },
  };

  return (
    <Link href={href}>
      <StyledLink
        initial="initial"
        whileHover="hover"
        variants={glowVariants}
        transition={{
          ease: 'easeOut',
          delay: 0.15,
        }}
      >
        <motion.p variants={textVariants}>{linkText}</motion.p>
      </StyledLink>
    </Link>
  );
};

export default LinkButton;
