import styled from "styled-components";

interface IInputPros {
  error?: boolean | undefined;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    margin-bottom: 8px;
  }
`
export const InputStyled = styled.input<IInputPros>`
  border: none;
  border-bottom: 1px solid ${({ error }) => error ? '#ee0000' : 'black'};
  padding: 8px;
  margin-bottom: 4px;

  :focus {
    outline: 0;
    box-shadow: 0 0 0 1px ${({ error }) => error ? '#ee0000' : 'black'};
    border-radius: inherit;
  }
`