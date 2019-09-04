import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	*{
		box-sizing: border-box;
		outline: none;
		padding: 0;
		margin: 0;
	}

	html,
	body, 
	#root{
		min-height: 100%;
	}

	body {
		background-color: #7159c1;
		text-rendering: optimizeLegibility !important;
		-webkit-font-smoothing: antialiased !important;
		font-family: 'Roboto', sans-serif;
	}

	body, input, button{
		color: #222;
		font-size: 14px;
	}

	button{
		cursor: pointer;
	}


`;

export default GlobalStyle;