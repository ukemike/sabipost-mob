import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// services
import { authApi } from "./services/auth.service";
import { generalApi } from "./services/general.service";
import { postApi } from "./services/post.service";
import { quoteApi } from "./services/quotes.service";
import { productApi } from "./services/product.service";
import { userApi } from "./services/user.service";
import { walletApi } from "./services/wallet.service";
import { orderApi } from "./services/order.service";
import { paymentApi } from "./services/payment.service";
import { notificationApi } from "./services/notification.service";

// reducers
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "ui"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [generalApi.reducerPath]: generalApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [quoteApi.reducerPath]: quoteApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  ui: uiReducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: {
    app: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [generalApi.reducerPath]: generalApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authApi.middleware,
      generalApi.middleware,
      postApi.middleware,
      quoteApi.middleware,
      productApi.middleware,
      userApi.middleware,
      walletApi.middleware,
      orderApi.middleware,
      paymentApi.middleware,
      notificationApi.middleware,
    ]),
});

setupListeners(store.dispatch);
type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
