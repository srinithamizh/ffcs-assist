import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const navigateToHome = (): void => {
    navigate('/');
  };

  return (
    <div className="not-found-page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <button className="btn btn-primary" onClick={navigateToHome}>
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
