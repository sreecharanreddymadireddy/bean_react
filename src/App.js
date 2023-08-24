import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent';
import AssignmentComponent from './components/AssignmentComponent';
import CreateAssignmentComponent from './components/CreateAssignmentComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import ProjectComponent from './components/ProjectComponent';
import CreateProjectComponent from './components/CreateProjectComponent'
import InvoiceComponent from './components/InvoiceComponent'
import SidebarComponent from './components/SidebarComponent'

function App() {
  return (
    <div className="app-container">
      <Router>
        <SidebarComponent />
        <HeaderComponent />
        <main role="main" style={{ marginLeft: '3rem', marginRight: 0, flexGrow: 1 }}>
          <Switch>
            <Route path="/" exact component={EmployeeComponent}></Route>
            <Route path="/employees" component={EmployeeComponent}></Route>
            <Route path="/add-employee/:id" component={CreateEmployeeComponent}></Route>
            <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
            <Route path="/assignments" component={AssignmentComponent}></Route>
            <Route path="/add-assignment/:id" component={CreateAssignmentComponent}></Route>
            <Route path="/projects" component={ProjectComponent}></Route>
            <Route path="/add-project/:id" component={CreateProjectComponent}></Route>
            <Route path="/invoices" component={InvoiceComponent}></Route>
          </Switch>
        </main>

      </Router>
    </div>
  );
}

export default App;
