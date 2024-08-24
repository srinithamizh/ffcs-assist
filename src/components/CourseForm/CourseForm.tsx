import React, { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { generateUUID, ICourse } from '../../utils';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../slice/CourseListSlice';

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
}
const CourseForm: React.FC<ICourseForm> = ({ editCourse }) => {
  const { register, setValue, watch, reset } = useForm({
    defaultValues: {
      form: {
        id: generateUUID(),
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

  const dispatch = useDispatch();

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
    setValue('form.id', generateUUID());
    dispatch(addCourse(form));
    reset();
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
              className="btn btn-primary-custom align-right submit-button"
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
