import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
import ProjectService from '../services/ProjectService';

const ProjectComponent = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        ProjectService.getAllProjects()
            .then(response => {
                setRowData(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    };

    const ActionsCellRenderer = ({ data }) => (
        <div>
            <Link to={`/update-project/${data.id}`} className="btn btn-info">
                Update
            </Link>
            <button
                onClick={() => deleteProject(data.id)}
                className="btn btn-danger"
            >
                Delete
            </button>
            <Link to={`/view-project/${data.id}`} className="btn btn-info">
                View
            </Link>
        </div>
    );

    const deleteProject = id => {
        ProjectService.deleteProject(id)
            .then(() => {
                fetchProjects();
            })
            .catch(error => {
                console.error('Error deleting project:', error);
            });
    };

    const columnDefs = [
        { headerName: 'Project Name', field: 'projectName', sortable: true, filter: true },
        { headerName: 'Vendor', field: 'vendor', sortable: true, filter: true },
        { headerName: 'Client', field: 'client', sortable: true, filter: true },
        { headerName: 'Bill Rate', field: 'billRate', sortable: true, filter: true },
        { headerName: 'Status', field: 'status', sortable: true, filter: true },
        { headerName: 'Actions', cellRenderer: ActionsCellRenderer },
    ];

    return (
        <div className="container">
            <h2 className="text-center">Projects List</h2>
            <div className="row">
                <Link to="/add-project/_add" className="btn btn-primary">
                    Add Project
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

export default ProjectComponent;
