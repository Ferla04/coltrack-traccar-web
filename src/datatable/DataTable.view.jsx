import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import useDataTable from './useDataTable';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './DataTable.style.css';

const DataTableView = ({ data, columns }) => {
  const { gridInitialData, gridApiRef, onBtnExport, onFilterTextBoxChanged } = useDataTable(data);

  return (
    <section id="data-grid">
      <div className="data-grid-cs">
        <button type="button" onClick={onBtnExport}>CSV</button>

        <input
          type="text"
          id="filter-text-box"
          placeholder="Buscar..."
          onInput={onFilterTextBoxChanged}
        />
      </div>

      <div className="ag-grid-theme ag-theme-alpine-auto-dark">
        <AgGridReact
          onGridReady={(params) => {
            gridApiRef.current = params.api;
          }}
          columnDefs={columns}
          rowData={gridInitialData}
          pagination
          paginationPageSize={20}
        />
      </div>
    </section>
  );
};

export default DataTableView;
