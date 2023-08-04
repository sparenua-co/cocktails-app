// src/components/Favourites.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Favourites from './Favourites';
import { AnyAction, Store, createStore } from 'redux';
import rootReducer from '../redux/reducers';
 
describe('<Favourites />', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    // Initialize a Redux store with the root reducer
    store = createStore(rootReducer);
    // Add a favorite cocktail to the initial state if required
    store.dispatch({
      type: 'ADD_FAVOURITE',
      payload: {
        idDrink: '1',
        // other cocktail properties
      },
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Favourites />
      </Provider>
    );
  });

  it('removes a favorite cocktail when the remove button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Favourites />
      </Provider>
    );

    // You'll have to update the button text to match your implementation
    const removeButton = screen.getByText('Remove');

    fireEvent.click(removeButton);

    // Check if the favorite cocktail was removed
    // Here, you might want to check the Redux state or modify the component to display a message when there are no favorites
  });
});
