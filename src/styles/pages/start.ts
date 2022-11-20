import styled from "styled-components";

export const Content = styled.div`
  height: calc(100vh - 100px);
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 32px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`
export const HeadersSection = styled.div`
  margin-bottom: 12px;

  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }
`

export const ButtonsSection = styled.section`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px
`