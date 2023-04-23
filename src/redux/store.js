import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'
import tokenReducer from './features/tokenSlice'
import slectReducer from './features/selectedSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    seleted:slectReducer,
  },
});