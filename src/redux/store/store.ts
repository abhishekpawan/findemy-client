import { configureStore } from "@reduxjs/toolkit";
// import products from "../reducers/products.reducer";
import courses from "../reducers/courses.reducer";
import cartCourses from "../reducers/cart.reducer";
import boughtCouses from "../reducers/boughtCourses.reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";
const store = configureStore({
  reducer: {
    courses,
    cartCourses,
    boughtCouses,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, product:ProductsState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// store => getState() / dispatch()
