import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { AppBar, Toolbar, Badge, Tabs, Tab } from "@material-ui/core";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tabLabel: {
    fontSize: '16px',
    minWidth: '100px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',  
      minWidth: '50px',

    },
  },
}));

const Navigation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const { favouriteCocktails } = useSelector(
    (state: RootState) => state.cocktails
  );
  const location = useLocation();

  const getTabValue = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/search":
        return 1;
      case "/favourites":
        return 2;
      default:
        return false;
    }
  };

  return (
    <AppBar position="static">
      <Container style={{ margin: "0 auto", padding: "0" }}>
        <Toolbar style={{ padding: "0", margin: "0 0" }}>
          <Typography
            style={{ color: "#f50057", textDecoration: "none" }}
            component={Link}
            to="/"
            variant="h6"
          >
            <img
              src="https://makecocktailsathome.com/wp-content/uploads/2022/05/mackCocktailsLogo.png"
              alt="Mack Cocktails Logo"
              style={{
                height: isMobile ? '50px' : "70px",  
                width: isMobile ? '80%' : "100%", 
                padding: "5px 5px 0 0",
                margin: isMobile ? '10px 0 0 25px' : '0'

              }}
            />
          </Typography>

          <Tabs value={getTabValue()}>
            <Tab
              label="Home"
              component={Link}
              to="/"
              className={classes.tabLabel}
            />
            
            <Tab
              label={
                <Badge
                  badgeContent={favouriteCocktails.length}
                  color="secondary"
                >
                  Favourites
                </Badge>
              }
              component={Link}
              to="/favourites"
              className={classes.tabLabel}
            />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
