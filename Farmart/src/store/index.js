
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

// Orders Slice (replacing cartSlice to handle orders)
const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [], orders: [] },
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
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    confirmOrder: (state, action) => {
      state.orders = state.orders.map(order =>
        order.id === action.payload ? { ...order, status: 'Confirmed' } : order
      );
    },
    rejectOrder: (state, action) => {
      state.orders = state.orders.map(order =>
        order.id === action.payload ? { ...order, status: 'Rejected' } : order
      );
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { addToCart, removeFromCart, clearCart, addOrder, confirmOrder, rejectOrder } = ordersSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export default store;
