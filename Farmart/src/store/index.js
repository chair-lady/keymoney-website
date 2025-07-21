import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, role: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;