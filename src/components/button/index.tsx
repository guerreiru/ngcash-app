import React from 'react';
import { ButtonStyled } from './styled';

interface IButtonPros extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'accent' | 'secondary';
}

export function Button({ label, ...props }: IButtonPros) {
  return <ButtonStyled {...props}>{label}</ButtonStyled>;
}
