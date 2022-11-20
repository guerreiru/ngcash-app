import styled from "styled-components";

interface IButtonPros {
  variant?: string;
}

const handleBoxShadow = (variant: string | undefined) => {
  switch (variant) {
    case 'accent':
      return '4px 6px 0px 0px rgba(158,99,255,1), 4px 6px 0px 1px rgba(0,0,0,1)'
    case 'secondary':
      return '4px 6px 0px 0px rgba(122, 44, 233), 4px 6px 0px 1px rgba(0,0,0,1)'
    default:
      return '4px 6px 0px 0px rgba(0,0,0,1), 4px 6px 0px 1px rgba(0,0,0,1)'
  }
}

export const ButtonStyled = styled.button<IButtonPros>`
  border-radius: 10px;
  padding: 16px 32px;
  background-color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  border-width: 1px;
  box-shadow: ${({ variant }) => handleBoxShadow(variant)};
  margin-bottom: 8px;
  transition: box-shadow linear 0.3s;


  :active {
    border-radius: 10px;
    background-color: #f4f4f4;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,1), 0px 0px 0px 0px rgba(0,0,0,1);
    
  }

  :focus:not(:active) {
    box-shadow: ${({ variant }) => handleBoxShadow(variant)};
    border-radius: 10px;
    background-color: #f4f4f4;
  }

  :hover {
    background-color: #f4f4f4;
  }
`