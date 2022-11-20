import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 4px 6px 0px 0px rgba(0,0,0,1), 4px 6px 0px 1px rgba(0,0,0,1);
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`