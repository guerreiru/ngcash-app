import styled from "styled-components";

export const MenuCards = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 160px));
  justify-content: center;
  gap: 16px;
  margin: 32px 0;
  user-select: none;
`

export const Balance = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 8px;
  background-color: ${({ theme }) => theme["gray-100"]};
  border-radius: 16px;
  padding: 4px 8px;
  margin-top: 16px;
  
  h2 {
    font-size: 18px;
    margin: 8px;
  }
`