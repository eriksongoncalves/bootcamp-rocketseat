import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-size: 15px;
  }

  body {
    background-color: #f2f2f2;
    font-size: 16px;
    font-family: Arial;
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobalStyle;