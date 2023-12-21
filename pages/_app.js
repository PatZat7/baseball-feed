import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../styles/tailwind.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { useStore } from "../redux/store";
import { createWrapper } from "next-redux-wrapper";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default MyApp;
