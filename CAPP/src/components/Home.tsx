import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers";
import SearchInput from "./SearchInput";
import { fetchRandomCocktails } from "../redux/actions/cocktailsActions";
import { AppDispatch } from "../redux/store";
import RefreshIcon from '@material-ui/icons/Refresh';


import {
  Button,
  Grid,
  Container,
  CircularProgress,
  Box,
} from "@material-ui/core";
import CocktailCard from "./CocktailCard";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { randomCocktails, loading } = useSelector(
    (state: RootState) => state.cocktails
  );

  useEffect(() => {
    dispatch(fetchRandomCocktails());
  }, [dispatch]);

  useEffect(() => {
    console.log("Random cocktails fetched:", randomCocktails.length); // Logging the randomCocktails
  }, [randomCocktails]);

  return (
    <Container>
    <Box
        sx={{
          justifyContent: "center",
          width: "100%",
          display: "flex",
          margin: "2.0rem 0 2.5rem  0 ",
        }}
      >
        {" "}
        <SearchInput placeholder="Search" />
        <Button
          variant="contained"
          title="refresh"
          aria-label="Refresh cocktails"
          color="secondary"
          style={{ padding: '10px 0px 10px 10px', margin:' 0 0 0 10px' }} 
          onClick={() => dispatch(fetchRandomCocktails())}
          startIcon={<RefreshIcon style={{ fontSize: '35px',   }} />}
        >
          
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <CircularProgress style={{ textAlign: "center" }} />
        ) : randomCocktails && randomCocktails.length >= 5 ? (
          <Grid container spacing={3}>
            {randomCocktails.slice(0, 5).map((drink: any) => (
              <Grid item xs={12} sm={5} md={3} key={drink.idDrink}>
                <CocktailCard cocktail={drink} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid item xs={12} sm={5} md={3}>
            <div style={{ textAlign: "center", fontStyle:"italic" }}>No cocktails found</div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
