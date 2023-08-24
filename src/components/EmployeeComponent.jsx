import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeComponent = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    fetch('http://localhost:8080/api/v1/employees')
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const deleteEmployee = id => {
    console.log('Deleting employee with ID:', id);
    EmployeeService.deleteEmployee(id)
      .then(res => {
        setRowData(prevData => prevData.filter(employee => employee.employeeId !== id));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };


  const ActionsCellRenderer = ({ data }) => (

    <div>
      {console.log('Cell Renderer Data:', data)}
      <Link to={`/add-employee/${data.employeeId}`} className="btn btn-info">
        Update
      </Link>
      <button
        onClick={() => deleteEmployee(data.employeeId)}
        className="btn btn-danger"
      >
        Delete
      </button>
      <Link to={`/view-employee/${data.employeeId}`} className="btn btn-info">
        View
      </Link>
    </div>
  );

  const columnDefs = [
    { headerName: 'Employee First Name', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Employee Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Employee Email Id', field: 'emailId', sortable: true, filter: true },
    { headerName: 'employeeType', field: 'employeeType', sortable: true, filter: true },
    { headerName: 'visa', field: 'visa', sortable: true, filter: true },
    { headerName: 'dob', field: 'dob', sortable: true, filter: true },
    { headerName: 'phone', field: 'phone', sortable: true, filter: true },
    { headerName: 'visa', field: 'visa', sortable: true, filter: true },
    { headerName: 'address', field: 'address', sortable: true, filter: true },
    { headerName: 'city', field: 'city', sortable: true, filter: true },
    { headerName: 'vendor', field: 'vendor', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: ActionsCellRenderer,
      width: 300,
    },
  ];

  const addEmployeeButton = (
    <Link to="/add-employee/_add" className="btn btn-primary">
      Add Employee
    </Link>
  );



  return (
    <div className="employee-container d-flex flex-column vh-100" style={{ marginTop: '20px' }}>
      <div>
        {addEmployeeButton}
      </div>
      <div className="ag-theme-alpine my-grid-container flex-grow-1" style={{ overflowX: 'auto' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            minWidth: 100,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={20}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
            params.columnApi.getAllColumns().forEach((column) => {
              params.columnApi.autoSizeColumn(column.getColId());
            });
          }}
        />
      </div>
    </div>
  );



};

export default EmployeeComponent;
