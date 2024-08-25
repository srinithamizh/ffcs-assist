import React from 'react';
import Timetable from '../components/Timetable/Timetable';
import TimetableForm from '../components/TimetableForm/TimetableForm';

const Home: React.FC = () => {
  return (
    <>
      <TimetableForm />
      <Timetable />
    </>
  );
};

export default Home;
