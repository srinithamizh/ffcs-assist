import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navItems = [
    {
      id: 1,
      name: 'Home',
      link: '/',
    },
    {
      id: 2,
      name: 'Course List',
      link: '/course-list',
    },
  ];
  return (
    <div>
      <nav className="navbar navbar-expand-lg" id="navbar_header">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>FFCS Assist</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li className="nav-item" key={item.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    aria-current="page"
                    to={item.link}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
