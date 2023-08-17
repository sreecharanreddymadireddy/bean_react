import React, { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { BrowserRouter as Router } from 'react-router-dom';


const ListEmployeeComponent = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/employees')
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const columnDefs = [
    { headerName: 'Employee First Name', field: 'firstName', sortable: true, filter: true, width: 200 },
    { headerName: 'Employee Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Employee Email Id', field: 'emailId', sortable: true, filter: true, width: 300 }
  ];

  return (
      <div>
      <Router>
        <div className="container">
          <div className="ag-theme-bootstrap my-grid-container">
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={8}
                domLayout='print'
              />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default ListEmployeeComponent;
