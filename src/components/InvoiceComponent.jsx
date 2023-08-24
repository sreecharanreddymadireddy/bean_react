import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import InvoiceService from '../services/InvoiceService';

const InvoiceComponent = () => {
    const [rowData, setRowData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        if (selectedMonth) {
            fetchInvoices(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchInvoices = (month) => {
        InvoiceService.getInvoicesForMonth(month)
            .then((data) => {
                const formattedData = data.map((item) => ({
                    assignmentId: item.assignment.assignmentId,
                    assignmentType: item.assignment.assignmentType,
                    billRate: item.assignment.billRate,
                    employeeName: `${item.assignment.employee.firstName} ${item.assignment.employee.lastName}`,
                    projectName: item.assignment.project.projectName,
                    startDate: item.assignment.startDate,
                    endDate: item.assignment.endDate,
                    hours: item.hours,
                    total: item.total,
                    invoiceDate: item.invoiceDate,
                    status: item.status,
                    paymentDate: item.paymentDate,
                }));
                console.log('Formatted data:', formattedData);
                setRowData(formattedData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const MonthsDropdown = () => (
        <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
        >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="202308">August</option>
            <option value="202309">September</option>
            <option value="202310">October</option>
            <option value="202311">November</option>
            <option value="202312">December</option>
        </select>
    );


    const columnDefs = [
        { headerName: 'Assignment ID', field: 'assignmentId', sortable: true, filter: true },
        { headerName: 'Assignment Type', field: 'assignmentType', sortable: true, filter: true },
        { headerName: 'Bill Rate', field: 'billRate', sortable: true, filter: true },
        { headerName: 'Employee Name', field: 'employeeName', sortable: true, filter: true },
        { headerName: 'Project Name', field: 'projectName', sortable: true, filter: true },
        { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true },
        { headerName: 'End Date', field: 'endDate', sortable: true, filter: true },
        { headerName: 'Hours', field: 'hours', sortable: true, filter: true },
        { headerName: 'Total', field: 'total', sortable: true, filter: true },
        { headerName: 'Invoice Date', field: 'invoiceDate', sortable: true, filter: true },
        { headerName: 'Status', field: 'status', sortable: true, filter: true },
        { headerName: 'Payment Date', field: 'paymentDate', sortable: true, filter: true },
    ];


    return (
        <div className="container">
            <h2 className="text-center">Invoices List</h2>
            <div className="row">
                <MonthsDropdown />
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

export default InvoiceComponent;
