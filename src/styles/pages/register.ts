import styled from "styled-components";

export const Content = styled.div`
  height: calc(100vh - 100px);
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 16px 32px 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`
export const InfoHeader = styled.div`
  h2 {
    margin: 24px 0;
    font-size: 18px;
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;

  a {
    text-align: center;
  }
`

export const Error = styled.p`
  color: #ee0000;
  font-weight: bold;
`