import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage for persistence
import userReducer from "./slices/userSlice";
import assignmentReducer from "./slices/assignmentSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "isAuthenticated", "sessionExpiry"], // Persist session data
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    assignment: assignmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
