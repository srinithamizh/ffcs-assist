import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CourseList from './components/CourseList/CourseList';
import HomeLayout from './layout/HomeLayout';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/ffcs-assist/" element={<HomeLayout />}>
            <Route index path="/ffcs-assist/" element={<Home />} />
            <Route path="/ffcs-assist/course-list" element={<CourseList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
