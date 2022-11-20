import styled from "styled-components";
import { Button } from "../button";

export const HeaderStyled = styled.header`
  background-color: ${({ theme }) => theme["gray-900"]};
  padding: 24px 16px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`
export const ButtonBack = styled.div`
  position: absolute;
  left: 64px;
  cursor: pointer;

  :hover {
    filter: brightness(0.8);
  }

  @media (max-width: 768px) {
    left: 24px;
  }
`

export const LogoContainer = styled.div`
  height: 100%;
  img {
    height: 100%
  }
`

export const LogOutButton = styled(Button)`
  padding: 8px 24px;
  background-color: #ffffff;
  font-size: 16px;
  margin-bottom: 0px;
  position: absolute;
  right: 64px;

  @media (max-width: 768px) {
    right: 24px;
  }
`
