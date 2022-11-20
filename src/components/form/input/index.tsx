import React from 'react';
import { Container, InputStyled } from './styled';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean | undefined;
  ref?: any;
}

export function Input({ label, error, ...props }: IInputProps) {
  return (
    <Container {...props}>
      {label && <label>{label}</label>}
      <InputStyled error={error} {...props} />
    </Container>
  );
}
