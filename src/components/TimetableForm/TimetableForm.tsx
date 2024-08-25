import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';
import { ICourse } from '../../utils';
import { useForm } from 'react-hook-form';
import { registerCourse } from '../../slice/CourseListSlice';

type formType = 'form' | 'form.code' | 'form.name' | 'form.slot';

const TimetableForm: React.FC = () => {
  const [filteredCourse, setFilteredCourse] = useState<ICourse[]>();
  const courseList = useSelector(
    (state: Rootstate) => state.courses.courseList
  );
  const dispatch = useDispatch();
  const { register, setValue, watch } = useForm({
    defaultValues: {
      form: {
        code: '',
        name: '',
        slot: '',
      },
    },
  });

  const form = watch('form');

  useEffect(() => {
    if (form.code !== '') {
      searchCourse(form.code);
    }
  }, [form.code]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as formType;
    const fieldValue = event.target.value;
    setValue(fieldName, fieldValue.toUpperCase());
  };

  const searchCourse = (courseCode: string) => {
    const result = courseList.filter((course: ICourse) =>
      course.code.startsWith(courseCode)
    );
    setFilteredCourse(result);
  };

  const addCourse = (course: ICourse) => {
    dispatch(registerCourse(course));
  };

  return (
    <div>
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title align-centered">Courses</h5>
        </div>
        <div className="card-body">
          <div className="row">
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
          </div>
          <div className="row mt-5 ">
            {filteredCourse &&
              filteredCourse.map((course) => (
                <div
                  className="col-md-3 list-group mb-2 d-flex "
                  key={course.id}
                  onDoubleClick={() => addCourse(course)}
                >
                  <div
                    className="h-100 list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        {course.code + ' - ' + course.name}
                      </h5>
                      {course.credit && (
                        <h6>
                          <span className="badge rounded-pill bg-primary-custom">
                            Credit: {course.credit}
                          </span>
                        </h6>
                      )}
                    </div>
                    <h6 className="mb-1">
                      <i className="bi bi-calendar2-week-fill"></i>
                      {' ' + course.slot + ' '}
                    </h6>
                    <h6>
                      <i className="bi bi-geo-alt-fill"></i>
                      {' ' + course.venue}
                    </h6>
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">
                        <i className="bi bi-person-fill"></i> {course.faculty}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary-custom align-right">
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimetableForm;
