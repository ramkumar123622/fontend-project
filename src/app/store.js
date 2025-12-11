import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";
import { userSlice } from "@/components/features/user/userSlice";
import { cartSlice } from "@/components/features/carts/cartSlice";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [userSlice.name] : userSlice.reducer,
    [cartSlice.name] : cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware]),
});
