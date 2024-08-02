import { configureStore } from "@reduxjs/toolkit";
import chemicalReducer from "../features/chemicalsSlice";

export const store = configureStore({
  reducer: {
    chemicals: chemicalReducer,
  },
});
