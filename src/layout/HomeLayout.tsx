import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer/Disclaimer';
import Footer from '../components/Footer/Footer';

const HomeLayout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Disclaimer />
      <Header />
      <main className="container main-content">
        <Outlet /> {/* Renders the matching child route */}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
