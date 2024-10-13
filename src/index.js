import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
//import { createTheme, ThemeProvider } from '@mui/material/styles'
//import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

//const theme = createTheme({
  //palette: {
  //  primary: {
  //    main: '#1976d2',
   // },
  //  secondary: {
  //    main: '#dc004e',
  //  },
  //},
//});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)