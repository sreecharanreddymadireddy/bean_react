import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';

function HeaderComponent() {
    return (
        <header style={{ backgroundColor: 'grey', position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1000' }}>
            <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '8px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
                    <FaUserTie className="mr-2" />
                    Employee Management App
                </Link>
            </nav>
        </header>
    );
}

export default HeaderComponent;
