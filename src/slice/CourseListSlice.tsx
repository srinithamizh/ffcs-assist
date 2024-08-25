import { createSlice } from '@reduxjs/toolkit';
import {
  getDataFromLocalStorage,
  ICourse,
  storageDataIntoLocalStorage,
} from '../utils';

interface ICourseState {
  courseList: ICourse[];
  registeredCourse: any;
  registeredCourseSlot: string[];
  status: 'idle' | 'loading' | 'success';
  error: null | string;
}
const initialState: ICourseState = {
  courseList: getDataFromLocalStorage(),
  registeredCourse: {},
  registeredCourseSlot: [],
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
    registerCourse: (state, action) => {
      const course = action.payload;
      const slots = course.slot.split('+');

      slots.forEach((slot: string) => {
        state.registeredCourse[
          slot
        ] = `${slot} ${course.code} ${course.name} ${course.faculty}`;
        if (!state.registeredCourseSlot.includes(slot)) {
          state.registeredCourseSlot.push(slot);
        }
      });
    },
  },
});

export const { addCourse, deleteCourse, registerCourse } =
  CourseListSlice.actions;
export default CourseListSlice.reducer;
