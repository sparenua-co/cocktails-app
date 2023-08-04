import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRandomCocktails } from '../actions/cocktailsActions';  


interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
}

interface CocktailsState {
    favouriteCocktails: Cocktail[];
    randomCocktails: Cocktail[]; // random cocktails
    loading: boolean;
  }
  
  const initialState: CocktailsState = {
    favouriteCocktails: [],
    randomCocktails: [], // Initialize the randomCocktails
    loading: false,
  };

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Cocktail>) => {
      state.favouriteCocktails.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favouriteCocktails = state.favouriteCocktails.filter(
        (item) => item.idDrink !== action.payload
      );
    },
    // Optionally, you could add reducers to manage the loading state, like this:
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
     extraReducers: (builder) => {
      builder
        .addCase(fetchRandomCocktails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchRandomCocktails.fulfilled, (state, action) => {
          state.loading = false;
          state.randomCocktails = action.payload;
        })
        .addCase(fetchRandomCocktails.rejected, (state, action) => {
          state.loading = false;
          // You could also handle the error message here
        });
    },
  });
export const { addFavourite, removeFavourite, startLoading, stopLoading } = cocktailsSlice.actions;

export default cocktailsSlice.reducer;
