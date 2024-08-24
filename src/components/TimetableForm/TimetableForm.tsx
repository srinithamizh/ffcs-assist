import React, { useEffect, useMemo, useState } from 'react';
import Autocomplete from '../AutoComplete/AutoComplete';

const TimetableForm: React.FC = () => {
  const courses = [
    {
      _id: '66c866d2b0d8aad620fb43de',
      courseCode: 'BLA555',
      courseName: 'Gonzales',
      courseSlot: 'I2',
    },
    {
      _id: '66c866d2f58e18f1b17d574d',
      courseCode: 'FER689',
      courseName: 'Mosley',
      courseSlot: 'D2',
    },
    {
      _id: '66c866d21f9daa4aca21eaae',
      courseCode: 'ALM727',
      courseName: 'Bartlett',
      courseSlot: 'K2',
    },
    {
      _id: '66c866d29bbd93a67c966388',
      courseCode: 'CLA694',
      courseName: 'Stephens',
      courseSlot: 'R1',
    },
    {
      _id: '66c866d288dd508584f3a0dc',
      courseCode: 'WHI518',
      courseName: 'Whitehead',
      courseSlot: 'C1',
    },
    {
      _id: '66c866d2499f038ca9e5ba57',
      courseCode: 'HAR787',
      courseName: 'Courtney',
      courseSlot: 'R2',
    },
    {
      _id: '66c866d277fdca1c6d7a51fb',
      courseCode: 'MIL689',
      courseName: 'Perez',
      courseSlot: 'G1',
    },
    {
      _id: '66c866d23bb06b6a6af44f4a',
      courseCode: 'SAN712',
      courseName: 'Angelica',
      courseSlot: 'S1',
    },
    {
      _id: '66c866d20122e20fee8f6c2e',
      courseCode: 'OCO517',
      courseName: 'Herrera',
      courseSlot: 'L1',
    },
  ];

  const [courseCode, setCourseCode] = useState<string>();
  const [courseName, setCourseName] = useState<string>();
  const [courseSlot, setCourseSlot] = useState<string>();

  const initialCourseCodes = useMemo(
    () => courses.map((course) => course.courseCode),
    []
  );
  const initialCourseNames = useMemo(
    () => courses.map((course) => course.courseName),
    []
  );
  const initialCourseSlots = useMemo(
    () => courses.map((course) => course.courseSlot),
    []
  );

  const [courseCodes, setCourseCodes] = useState(initialCourseCodes);
  const [courseNames, setCourseNames] = useState(initialCourseNames);
  const [courseSlots, setCourseSlots] = useState(initialCourseSlots);

  const handleAddCourse = () => {
    console.log(courseCode, courseName, courseSlot);
  };

  useEffect(() => {
    console.log(courseCode);
    console.log(courseName);
    console.log(courseSlot);
  }, [courseCode, courseName, courseSlot]);
  return (
    <div className="row g-3 mt-2">
      <div className="col-md-2">
        <label htmlFor="inputCourseCode" className="form-label">
          Course Code
        </label>
        <Autocomplete
          suggestions={courseCodes}
          placeholder={'Course Code'}
          setValue={setCourseCode}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputCourseName" className="form-label">
          Course Name
        </label>
        <Autocomplete
          suggestions={courseNames}
          placeholder={'Course Name'}
          setValue={setCourseName}
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputSlot" className="form-label">
          Course Slot
        </label>
        <Autocomplete
          suggestions={courseSlots}
          placeholder={'Course Slot'}
          setValue={setCourseSlot}
        />
      </div>
      <div className="col-12">
        <button className="btn btn-primary" onClick={handleAddCourse}>
          Add Course
        </button>
      </div>
    </div>
  );
};

export default TimetableForm;
