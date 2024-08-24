import React, { useState } from 'react';
import CourseForm from '../CourseForm/CourseForm';
import { ICourse } from '../../utils';
import CSVReader from '../CSVReader/CSVReader';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';
import { deleteCourse } from '../../slice/CourseListSlice';

const CourseList: React.FC = () => {
  const courseList = useSelector(
    (state: Rootstate) => state.courses.courseList
  );
  const dispatch = useDispatch();

  const [editCourse, setEditCourse] = useState<ICourse | null>();
  const [isInUploadMode, setIsInUploadMode] = useState<boolean>(false);

  const handleDelete = (course: ICourse) => {
    dispatch(deleteCourse(course.id));
  };

  const handleEdit = (course: ICourse) => {
    dispatch(deleteCourse(course.id));
    setEditCourse(course);
  };

  const toggleMode = () => {
    setIsInUploadMode(!isInUploadMode);
  };

  return (
    <>
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title align-centered">Add Course</h5>
        </div>
        <div className="card-body">
          {isInUploadMode && (
            <a
              className="link-primary-custom align-right"
              href="/ffcs-assist/course_template.csv"
            >
              Download Template
            </a>
          )}
          {isInUploadMode ? (
            <div className="mt-5">
              <CSVReader />
            </div>
          ) : (
            <CourseForm editCourse={editCourse} />
          )}

          <button
            className={
              isInUploadMode
                ? 'btn btn-secondary-custom'
                : 'btn btn-secondary-custom toggle-button'
            }
            onClick={toggleMode}
          >
            {isInUploadMode ? 'Add Course Manually' : 'Import Course by File'}
          </button>
        </div>
      </div>

      <div className="card mt-4 mb-2">
        <div className="card-header">
          <h5 className="card-title align-centered">Course List</h5>
        </div>
        <div className="card-body">
          {courseList.length > 0 ? (
            courseList.map((course) => (
              <div className="list-group mb-2" key={course.id}>
                <div
                  className="list-group-item list-group-item-action"
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
                    <div>
                      <button
                        className="badge bg-success mx-2 custom-badge"
                        onClick={() => handleEdit(course)}
                      >
                        Edit
                      </button>
                      <button
                        className="badge bg-danger custom-badge"
                        onClick={() => handleDelete(course)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5 className="align-centered">No Course Found!</h5>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseList;
