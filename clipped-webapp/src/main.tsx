import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import "./styles/fonts.css"
import "./styles/app.scss"

const darkTheme = createTheme({
    palette: {
        /*primary: {
            main: "#58b368",
        },
        secondary: {
            main: "#309975",
        },*/
        background: {
            default: '#101418',
            paper: '#101418'
        },
        
        mode: 'dark',
    },
    typography: {
        fontFamily: [
            "Source Sans Pro",
            "Microsoft Yahei"
        ].join(',')
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
)

document.addEventListener('contextmenu', event => event.preventDefault());