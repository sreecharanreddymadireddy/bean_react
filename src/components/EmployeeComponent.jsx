import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeComponent = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/employees')
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const deleteEmployee = id => {

    EmployeeService.deleteEmployee(id)
      .then(res => {
        setRowData(prevData => prevData.filter(employee => employee.id !== id));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  const ActionsCellRenderer = ({ data }) => (
    <div>
      <Link to={`/add-employee/${data.id}`} className="btn btn-info">
        Update
      </Link>
      <button
        onClick={() => deleteEmployee(data.id)}
        className="btn btn-danger"
      >
        Delete
      </button>
      <Link to={`/view-employee/${data.id}`} className="btn btn-info">
        View
      </Link>
    </div>
  );

  const columnDefs = [
    { headerName: 'Employee First Name', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Employee Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Employee Email Id', field: 'emailId', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: ActionsCellRenderer,
    },
  ];

  return (
    <div className="container">
      <h2 className="text-center">Employees List</h2>
      <div className="row">
        <Link to="/add-employee/_add" className="btn btn-primary">
          Add Employee
        </Link>
      </div>
      <div className="ag-theme-alpine my-grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={8}
        />
      </div>
    </div>
  );
};

export default EmployeeComponent;
