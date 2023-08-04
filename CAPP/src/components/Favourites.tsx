// src/components/Favourites.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers";
import { removeFavourite } from "../redux/reducers/cocktailsReducer";
import { Grid, Button, Box, Container } from "@material-ui/core";
import SearchInput from "./SearchInput";
import CocktailCard from "./CocktailCard";

const Favourites: React.FC = () => {
  const { favouriteCocktails } = useSelector(
    (state: RootState) => state.cocktails
  );
  const dispatch = useDispatch();

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
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {favouriteCocktails.map((drink: any) => (
          <Grid item xs={12} sm={5} md={3} key={drink.idDrink}>
            <CocktailCard cocktail={drink} />

            <Button
              color="secondary"
              aria-label={`Remove ${drink.strDrink} from favourites`} // aria-label here
              onClick={() => dispatch(removeFavourite(drink.idDrink))}
            >
              X Remove
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favourites;
