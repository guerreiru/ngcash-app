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

export const Filters = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  .inputFilter {
    width: 100%;
    flex: 1;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    button {
      width: 100%;
    }
  }
`

export const NoDataInfo = styled.div``
