import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';

function HeaderComponent() {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <FaUserTie className="mr-2" />
                        Employee Management App
                    </Link>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/employees" className="nav-link">Employee</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/projects" className="nav-link">Project</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/assignments" className="nav-link">Assignment</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default HeaderComponent;
