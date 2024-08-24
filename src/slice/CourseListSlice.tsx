import { createSlice } from '@reduxjs/toolkit';
import {
  getDataFromLocalStorage,
  ICourse,
  storageDataIntoLocalStorage,
} from '../utils';

interface ICourseState {
  courseList: ICourse[];
  status: 'idle' | 'loading' | 'success';
  error: null | string;
}
const initialState: ICourseState = {
  courseList: getDataFromLocalStorage(),
  status: 'idle',
  error: null,
};

const CourseListSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.status = 'loading';
      const stored = storageDataIntoLocalStorage(
        state.courseList,
        action.payload
      );
      if (stored) {
        state.status = 'success';

        state.courseList.push(action.payload);
      } else {
        state.error = 'Failed to save, course already exists';
      }
    },
    deleteCourse: (state, action) => {
      state.courseList = state.courseList.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem('courseList', JSON.stringify(state.courseList));
    },
  },
});

export const { addCourse, deleteCourse } = CourseListSlice.actions;
export default CourseListSlice.reducer;
