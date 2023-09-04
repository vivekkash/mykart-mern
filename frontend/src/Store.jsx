import { createContext, useReducer } from 'react';

export const Store = createContext();

//set cartItems to localstorage or db instead of empty in init

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    address: localStorage.getItem('address')
      ? JSON.parse(localStorage.getItem('address'))
      : null,
  },
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  checkout_step: {
    delivery: false,
    order_summary: false,
    payment: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CART_ADD_PRODUCT': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.product_internal_id === newItem.product_internal_id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.product_internal_id === newItem.product_internal_id
              ? newItem
              : item
          )
        : [...state.cart.cartItems, newItem];

      // for persistence of the cart items, lets store in localstorage, same can be pushed into db
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case 'CART_REMOVE_PRODUCT': {
      const removeItem = action.payload;

      const cartItems = state.cart.cartItems.filter(
        (item) => item.product_internal_id !== removeItem.product_internal_id
      );

      //update the localstorage too
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }

    case 'CART_CLEAN': {
      localStorage.removeItem('cartItems');

      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    }

    case 'USER_LOGIN': {
      localStorage.setItem('user', JSON.stringify(action.payload.data));
      return { ...state, user: action.payload.data };
    }

    case 'USER_LOGOUT': {
      localStorage.removeItem('user');
      localStorage.removeItem('address');
      return { ...state, user: null };
    }

    case 'SAVE_USER_ADDRESS': {
      localStorage.setItem('address', JSON.stringify(action.payload));
      return { ...state, cart: { ...state.cart, address: action.payload } };
    }

    case 'CHECKOUT_STEP_ADDRESS': {
      return {
        ...state,
        checkout_step: { ...state.checkout_step, delivery: action.payload },
      };
    }
    case 'CHECKOUT_STEP_ORDER_SUMMARY': {
      return {
        ...state,
        checkout_step: {
          ...state.checkout_step,
          order_summary: action.payload,
        },
      };
    }
    case 'CHECKOUT_STEP_PAYMENT': {
      return {
        ...state,
        checkout_step: { ...state.checkout_step, payment: action.payload },
      };
    }

    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
