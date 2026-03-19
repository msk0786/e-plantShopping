/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      if (!item?.name) return;

      const existingItem = state.items.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 0) + 1;
        return;
      }

      state.items.push({
        ...item,
        quantity: 1,
      });
    },
    removeItem: (state, action) => {
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload?.name;
      if (!name) return;

      state.items = state.items.filter((i) => i.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload ?? {};
      if (!name || typeof amount !== 'number') return;

      if (amount <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
        return;
      }

      const item = state.items.find((i) => i.name === name);
      if (!item) return;

      item.quantity = amount;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
