import { configureStore } from '@reduxjs/toolkit';
import courseListReducer from '../slice/CourseListSlice';

export const store = configureStore({
  reducer: {
    courses: courseListReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
