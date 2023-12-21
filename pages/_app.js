import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../styles/tailwind.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { useStore } from "../redux/store";
import { createWrapper } from 'next-redux-wrapper';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
