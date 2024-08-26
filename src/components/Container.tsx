import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 50vw;
  margin-bottom: 10px;

  & > label {
    font-weight: bold;
    color: royalblue;
  }

  & > input {
    width: 100%;
  }
`;
