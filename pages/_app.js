import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/tailwind.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { useStore } from '../redux/store';

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
       <ThemeProvider theme={theme}>
          <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
