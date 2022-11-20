import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme['gray-700']};
  -webkit-font-smoothing: antialiased;
  line-height: 1.30;
  font-weight: 400;
}

body, input,  textarea, button {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 400;
  font-size: 1rem;
}

a {
  color: inherit;
}

button {
  cursor: pointer;
}

img {
  width: 100%;
}
`;
