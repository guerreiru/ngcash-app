import styled from "styled-components";
import { Button } from "../button";

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

interface IDialogPros {
  variant?: string;
}

export const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`
export const Content = styled.div<IDialogPros>`
  background-color: #ffffff;
  padding: 32px;
  min-width: 50%;
  min-height: 20%;
  border-radius: 8px;
  box-shadow: ${({ variant }) => handleBoxShadow(variant)};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Header = styled.div`
  margin-bottom: 24px;
  p {
    color: black;
    font-size: 1.25rem;
    text-align: center;
    font-weight: bold;
  }
`

export const Body = styled.div``

export const ButtonFooter = styled(Button)`
  padding: 8px 24px;
  background-color: #ffffff;
  font-size: 16px;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`