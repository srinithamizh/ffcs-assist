import React, { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getRandomInteger, ICourse } from '../../utils';

type formType =
  | 'form'
  | 'form.id'
  | 'form.code'
  | 'form.name'
  | 'form.slot'
  | 'form.category'
  | 'form.faculty'
  | 'form.venue'
  | 'form.credit';

interface ICourseForm {
  editCourse?: ICourse | null;
  setEditCourse: (course: ICourse | null) => void;
  setCourseList: (courseList: ICourse[]) => void;
}
const CourseForm: React.FC<ICourseForm> = ({
  editCourse,
  setEditCourse,
  setCourseList,
}) => {
  const { register, setValue, watch, reset } = useForm({
    defaultValues: {
      form: {
        id: getRandomInteger(5, 10000, 99999),
        code: '',
        name: '',
        slot: '',
        category: '',
        faculty: '',
        venue: '',
        credit: '',
      },
    },
  });

  useEffect(() => {
    if (editCourse) {
      setValue('form.id', editCourse.id);
      setValue('form.category', editCourse.category);
      setValue('form.code', editCourse.code);
      setValue('form.name', editCourse.name);
      setValue('form.slot', editCourse.slot);
      setValue('form.faculty', editCourse.faculty);
      setValue('form.venue', editCourse.venue);
      setValue('form.credit', editCourse.credit);
    }
  }, [editCourse]);

  const form = watch('form');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as formType;
    const fieldValue = event.target.value;
    setValue(fieldName, fieldValue.toUpperCase());
  };

  const handleAddCourse = () => {
    const storedCourses = localStorage.getItem('courseList');
    let courseList: ICourse[] = storedCourses ? JSON.parse(storedCourses) : [];

    const isDuplicate = courseList.some(
      (item) =>
        item.code === form.code &&
        item.slot === form.slot &&
        item.venue === form.venue
    );

    if (!isDuplicate) {
      form.id = getRandomInteger(5, 10000, 99999);
      courseList.push(form);
      localStorage.setItem('courseList', JSON.stringify(courseList));
      setCourseList(courseList);
      setEditCourse(null);
      reset();
    } else {
      console.log('Duplicate found, course not added.');
    }
  };

  return (
    <>
      <div>
        <div className="row g-3">
          <div className="col-md-3">
            <label htmlFor="inputCourseCategory" className="form-label">
              Course Category
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCourseCategory"
              {...register('form.category')}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputCourseCode" className="form-label">
              Course Code
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCourseCode"
              {...register('form.code')}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCourseName" className="form-label">
              Course Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCourseName"
              {...register('form.name')}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputCourseSlot" className="form-label">
              Course Slot
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCourseSlot"
              {...register('form.slot')}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputCourseFaculty" className="form-label">
              Faculty Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCourseFaculty"
              {...register('form.faculty')}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputCourseVenue" className="form-label">
              Venue
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCourseVenue"
              {...register('form.venue')}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputCourseCredit" className="form-label">
              Credit
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCourseCredit"
              {...register('form.credit')}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary-custom align-right"
              onClick={handleAddCourse}
            >
              {editCourse ? 'Edit ' : 'Add '} Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseForm;
