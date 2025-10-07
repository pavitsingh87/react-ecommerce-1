import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    localStorage.removeItem('cart');
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && item.variant === action.payload.variant
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; variant?: string }>) => {
      state.items = state.items.filter(item => 
        !(item.id === action.payload.id && item.variant === action.payload.variant)
      );
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; variant?: string; quantity: number }>) => {
      const item = state.items.find(item => 
        item.id === action.payload.id && item.variant === action.payload.variant
      );
      if (item) {
        item.quantity = action.payload.quantity;
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      try {
        localStorage.removeItem('cart');
      } catch (error) {
        console.error('Error clearing cart from storage:', error);
      }
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;