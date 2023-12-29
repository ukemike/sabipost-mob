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

import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// services
import { authApi } from "./services/auth.service";
import { profileApi } from "./services/profile.service";
import { generalApi } from "./services/general.service";
import { postApi } from "./services/post.service";
import { productApi } from "./services/product.service";
import { quoteApi } from "./services/quotes.service";
import { orderApi } from "./services/order.service";
import { notificationApi } from "./services/notification.service";
import { userApi } from "./services/user.service";

// reducers
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import productReducer from "./slices/productSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "post", "product"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  product: productReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [generalApi.reducerPath]: generalApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [quoteApi.reducerPath]: quoteApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: {
    app: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [generalApi.reducerPath]: generalApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authApi.middleware,
      profileApi.middleware,
      generalApi.middleware,
      postApi.middleware,
      productApi.middleware,
      quoteApi.middleware,
      orderApi.middleware,
      notificationApi.middleware,
      userApi.middleware,
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
