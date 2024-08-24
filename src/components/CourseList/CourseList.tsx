import React, { useEffect, useState } from 'react';
import CourseForm from '../CourseForm/CourseForm';
import { ICourse } from '../../utils';
import CSVReader from '../CSVReader/CSVReader';

const CourseList: React.FC = () => {
  const [courseList, setCourseList] = useState<ICourse[]>([]);
  const [editCourse, setEditCourse] = useState<ICourse | null>();
  const [isInUploadMode, setIsInUploadMode] = useState<boolean>(false);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courseList');
    let courses = storedCourses ? JSON.parse(storedCourses) : [];
    setCourseList(courses);
  }, []);

  const handleDelete = (course: ICourse) => {
    const newCourseList = courseList.filter((item) => item.id !== course.id);
    setCourseList(newCourseList);
    localStorage.setItem('courseList', JSON.stringify(newCourseList));
  };

  const handleEdit = (course: ICourse) => {
    const newCourseList = courseList.filter((item) => item.id !== course.id);
    setCourseList(newCourseList);
    localStorage.setItem('courseList', JSON.stringify(newCourseList));
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
          {isInUploadMode ? (
            <div className="mt-5">
              <CSVReader
                courseList={courseList}
                setCourseList={setCourseList}
              />
            </div>
          ) : (
            <CourseForm
              editCourse={editCourse}
              setEditCourse={setEditCourse}
              setCourseList={setCourseList}
            />
          )}

          <button className="link-primary-custom" onClick={toggleMode}>
            {isInUploadMode ? 'Add Course Manually' : 'Import Course'}
          </button>
        </div>
      </div>

      <div className="card mt-4 mb-2">
        <div className="card-header">
          <h5 className="card-title align-centered">Course List</h5>
        </div>
        <div className="card-body">
          {courseList &&
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
            ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
