import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
import AssignmentService from '../services/AssignmentService';

const AssignmentComponent = () => {
  const [rowData, setRowData] = useState([]);
  // const EmployeeLinkCellRenderer = ({ value, data }) => (
  //   <Link to={`/employee-details/${value}`}>{value}</Link>
  // );


  const ActionsCellRenderer = ({ data }) => (
    <div>
      <Link to={`/add-assignment/${data.id}`} className="btn btn-info">
        Update
      </Link>
      <button
        onClick={() => deleteAssignment(data.id)}
        className="btn btn-danger"
      >
        Delete
      </button>
      <Link to={`/view-assignment/${data.id}`} className="btn btn-info">
        View
      </Link>
    </div>
  );

  const columnDefs = [
    { headerName: 'assignmentType', field: 'assignmentType', sortable: true, filter: true },
    { headerName: 'startDate', field: 'startDate', sortable: true, filter: true },
    { headerName: 'endDate', field: 'endDate', sortable: true, filter: true },
    { headerName: 'billRate', field: 'billRate', sortable: true, filter: true },
    { headerName: 'status', field: 'status', sortable: true, filter: true },
    { headerName: 'note', field: 'note', sortable: true, filter: true },
    // {
    //   headerName: 'Employee ID',
    //   field: 'employee_assignment_fid',
    //   sortable: true,
    //   filter: true,
    //   cellRenderer: EmployeeLinkCellRenderer,
    // },
    {
      headerName: 'Actions',
      cellRenderer: ActionsCellRenderer,
    },
  ];
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/assignments')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data); // Log the fetched data
        setRowData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const deleteAssignment = id => {
    AssignmentService.deleteAssignment(id)
      .then(res => {
        setRowData(prevData => prevData.filter(assignment => assignment.id !== id));
      })
      .catch(error => {
        console.error('Error deleting assignment:', error);
      });
  };



  return (
    <div className="container">
      <h2 className="text-center">Assignments List</h2>
      <div className="row">
        <Link to="/add-assignment/_add" className="btn btn-primary">
          Add Assignment
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

export default AssignmentComponent;
