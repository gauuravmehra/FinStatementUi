import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { StyledTableContainer } from "./Table.style";
import { TableRowsProps } from "./Table.type";

type TableProps = {
  columnDefs: ColDef[];
  rowsData: TableRowsProps[];
  onCellValueChanged: (event: any) => void;
  onGridReady?: (data: any) => void;
};

export const Table = ({
  columnDefs,
  rowsData,
  onCellValueChanged,
  onGridReady,
}: TableProps) => {
  return (
    <StyledTableContainer className="ag-theme-quartz stripped">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowsData}
        onCellValueChanged={onCellValueChanged}
        onGridReady={onGridReady}
        defaultColDef={{
          editable: true,
          sortable: true,
          resizable: true,
        }}
      />
    </StyledTableContainer>
  );
};

export default Table;
