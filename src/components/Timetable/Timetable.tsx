import React from 'react';
import timetableData from '../../timetable-schema/vellore.json';
import './Timetable.css';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';

const Timetable: React.FC = () => {
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri'];

  const registeredCourse = useSelector(
    (state: Rootstate) => state.courses.registeredCourse
  );

  const registeredCourseSlot = useSelector(
    (state: Rootstate) => state.courses.registeredCourseSlot
  );

  const checkSlotIsRegistered = (slot: string) => {
    console.log(registeredCourseSlot);
    return registeredCourseSlot.includes(slot);
  };

  type courseKey = keyof typeof registeredCourse;

  const checkRegisteredCourseBySlot = (slot: courseKey | string): any => {
    if (typeof slot && slot in registeredCourse) {
      return registeredCourse[slot as courseKey];
    }
    return slot;
  };

  return (
    <div className="container mt-5 ">
      <h3 className="align-centered">Time Table</h3>
      <div className="table-reponsive-lg time-table">
        <table className="table table-bordered table-equal" id="timetable">
          <thead>
            <tr>
              <th className="table-heading">THEORY</th>
              {timetableData.theory.map((theory, index) => (
                <th className="theory-timing" key={`theory-${index}`}>
                  {theory.placeholder ? (
                    ''
                  ) : theory.start ? (
                    <p>
                      {theory.start}
                      <br />
                      {theory.end}
                    </p>
                  ) : (
                    'LUNCH'
                  )}
                </th>
              ))}
            </tr>
            <tr>
              <th className="table-heading">LAB</th>
              {timetableData.lab.map((lab, index) => (
                <th className="lab-timing" key={`lab-${index}`}>
                  {lab.placeholder ? (
                    ''
                  ) : lab.start ? (
                    <p>
                      {lab.start}
                      <br />
                      {lab.end}
                    </p>
                  ) : (
                    'LUNCH'
                  )}
                </th>
              ))}
            </tr>
            {daysOfWeek.map((day) => (
              <React.Fragment key={day}>
                <tr>
                  <th className="table-heading" rowSpan={2}>
                    {day.toUpperCase()}
                  </th>
                  {timetableData.theory.map((theory: any, theoryIndex) => (
                    <td
                      className={
                        theory.days && checkSlotIsRegistered(theory.days[day])
                          ? 'register-class'
                          : 'class-highlight'
                      }
                      key={`theory-${day}-${theoryIndex}`}
                    >
                      {theory.days &&
                        checkRegisteredCourseBySlot(theory.days[day])}
                    </td>
                  ))}
                </tr>
                <tr>
                  {timetableData.lab.map((lab: any, labIndex) => (
                    <td
                      className={
                        lab.days && checkSlotIsRegistered(lab.days[day])
                          ? 'register-class'
                          : 'lab-highlight'
                      }
                      key={`lab-${day}-${labIndex}`}
                    >
                      {lab.days && checkRegisteredCourseBySlot(lab.days[day])}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
