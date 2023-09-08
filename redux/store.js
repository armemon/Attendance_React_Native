import { configureStore } from "@reduxjs/toolkit";
import { authReducer, datasetReducer } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dataset: datasetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state check
      immutableCheck: false,
    }),
});

export default store;