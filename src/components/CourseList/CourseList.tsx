import React, { useEffect, useState } from 'react';
import CourseForm from '../CourseForm/CourseForm';
import { ICourse } from '../../utils';

const CourseList: React.FC = () => {
  const [courseList, setCourseList] = useState<ICourse[]>([]);
  const [editCourse, setEditCourse] = useState<ICourse | null>();

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

  return (
    <>
      <div className="row">
        <div className="col-md-6 mt-4">
          <CourseForm
            editCourse={editCourse}
            setEditCourse={setEditCourse}
            setCourseList={setCourseList}
          />
        </div>
        <div className="col-md-6 mt-4">
          <h3 className="justify-center">Course List</h3>
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
