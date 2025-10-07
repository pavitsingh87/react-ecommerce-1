import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const initialState: AuthState = {
  user: null,
  token: getTokenFromStorage(),
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  try {
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userData: { name: string; email: string; password: string }) => {
  const response = await api.post('/auth/register', userData);
  try {
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
  return response.data;
});

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const response = await api.get('/auth/me');
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      try {
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Error removing token:', error);
      }
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        try {
          localStorage.removeItem('token');
        } catch (error) {
          console.error('Error removing token:', error);
        }
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;