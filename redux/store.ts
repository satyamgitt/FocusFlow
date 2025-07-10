import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appListReducer from './slices/appListSlice';
import triggersReducer from './slices/triggersSlice';
import motivationReducer from './slices/motivationSlice';
import subscriptionReducer from './slices/subscriptionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appList: appListReducer,
    triggers: triggersReducer,
    motivation: motivationReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;