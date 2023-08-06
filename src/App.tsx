import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Favourites from "./components/Favourites";
import Navigation from "./components/Navigation";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#84DCC6",
      },
      secondary: {
        main: "#F85F73", // Secondary color
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
