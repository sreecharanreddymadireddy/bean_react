import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaUserTie, FaProjectDiagram, FaClipboardList, FaFileInvoice } from 'react-icons/fa';

function SidebarComponent() {
    const history = useHistory();

    const handleSelect = (selected) => {
        console.log(`Selected item: ${selected}`);
        switch (selected) {
            case 'employees':
                history.push('/employees');
                break;
            case 'projects':
                history.push('/projects');
                break;
            case 'assignments':
                history.push('/assignments');
                break;
            case 'invoices':
                history.push('/invoices');
                break;
            default:
                break;
        }
    };

    return (
        <SideNav onSelect={handleSelect} style={{backgroundColor: '#333', position: 'absolute', top: '40px' }} >
            <Toggle />
            <Nav defaultSelected="employees">
                <NavItem eventKey="employees">
                    <NavIcon>
                        <FaUserTie style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to="/employees">Employees</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="projects">
                    <NavIcon>
                        <FaProjectDiagram style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to="/projects">Projects</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="assignments">
                    <NavIcon>
                        <FaClipboardList style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to="/assignments">Assignments</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="invoices">
                    <NavIcon>
                        <FaFileInvoice style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to="/invoices">Invoices</Link>
                    </NavText>
                </NavItem>
            </Nav>
        </SideNav>
    );
}

export default SidebarComponent;
