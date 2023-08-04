import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strDrinkThumb: string;
}

export const fetchRandomCocktails = createAsyncThunk<Cocktail[], void, { rejectValue: string }>(
    'cocktails/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      // Fetching 5 random cocktails
      const responses = await Promise.all(
        Array(5)
          .fill(0)
          .map(() => axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php'))
      );
      return responses.map((response) => response.data.drinks[0] as Cocktail);
    }  catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('An error occurred');
      }
  }
);
