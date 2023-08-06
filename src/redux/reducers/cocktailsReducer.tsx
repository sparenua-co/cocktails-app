import { fetchRandomCocktails } from '../actions/cocktailsActions';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
}

interface CocktailsState {
  favouriteCocktails: Cocktail[];
  randomCocktails: Cocktail[];
  loading: boolean;
}

const savedFavourites = localStorage.getItem('favouriteCocktails');
const parsedFavourites = savedFavourites ? JSON.parse(savedFavourites) : [];

const initialState: CocktailsState = {
  favouriteCocktails: parsedFavourites,
  randomCocktails: [],
  loading: false,
};

// Action Types
const ADD_FAVOURITE = 'ADD_FAVOURITE';
const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
const START_LOADING = 'START_LOADING';
const STOP_LOADING = 'STOP_LOADING';

// Action Creators
export const addFavourite = (cocktail: Cocktail) => ({
  type: ADD_FAVOURITE,
  payload: cocktail,
});

export const removeFavourite = (idDrink: string) => ({
  type: REMOVE_FAVOURITE,
  payload: idDrink,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});

export const cocktailsReducer = (state = initialState, action: any): CocktailsState => {
  switch (action.type) {
    case ADD_FAVOURITE:
      const addedFavourites = [...state.favouriteCocktails, action.payload];
      localStorage.setItem('favouriteCocktails', JSON.stringify(addedFavourites)); // add to localStorage
      return {
        ...state,
        favouriteCocktails: addedFavourites,
      };
    case REMOVE_FAVOURITE:
      const remainingFavourites = state.favouriteCocktails.filter(item => item.idDrink !== action.payload);
      localStorage.setItem('favouriteCocktails', JSON.stringify(remainingFavourites));
      return {
        ...state,
        favouriteCocktails: remainingFavourites,
      };
    case START_LOADING:
    case fetchRandomCocktails.pending.type:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
    case fetchRandomCocktails.rejected.type:
      return {
        ...state,
        loading: false,
      };
    case fetchRandomCocktails.fulfilled.type:
      return {
        ...state,
        loading: false,
        randomCocktails: action.payload,
      };
    default:
      return state;
  }
};

export default cocktailsReducer;
