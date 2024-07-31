import { useCallback, useEffect, useState } from "react";
import Table from "../common/table/Table";
import Header from "../header/Header";
import {
  Headings,
  initColumnConfig,
  initRowsData,
} from "./FinancialStatement.config";
import { ICellRendererParams } from "ag-grid-community";
import { FaPlusCircle } from "react-icons/fa";
import { StyledContainer } from "./FinancialStatement.style";
import { TableRowsProps } from "../common/table/Table.type";
import { v4 as uuidv4 } from "uuid";
import { updatedSum, updatedVariance } from "./FinancialStatement.utils";

export const FinancialStatement = () => {
  const [columns, setColumns] = useState(initColumnConfig);
  const [rowsData, setRowsData] = useState(initRowsData);

  useEffect(() => {
    const updatedData = updatedSum(rowsData);
    setRowsData(updatedData);
  }, []);

  const insertEmptyRow = ({
    prevData,
    clickedRow,
  }: {
    prevData: TableRowsProps[];
    clickedRow: TableRowsProps;
  }): TableRowsProps[] => {
    const { id, type } = clickedRow;

    const emptyRow = {
      id: uuidv4(),
      million: "",
      year2021: "",
      year2022: "",
      year2024: "",
      variance: "",
      variancePercent: "",
      type,
    };

    // logic to insert an empty row
    const rowIndex = prevData.findIndex((row) => row.id === id) + 1;
    const rowDataCopy = [...prevData];
    rowDataCopy.splice(rowIndex, 0, emptyRow);
    return rowDataCopy;
  };

  const valueChangeHandler = useCallback(
    (event: any) => {
      const changedData = event.data;
      const updatedRowsData = updatedVariance(changedData, rowsData);
      if (updatedRowsData) {
        const updatedSumData = updatedSum(updatedRowsData);
        setRowsData(updatedSumData);
      }
    },
    [rowsData]
  );

  const addNewRowClickHandler = useCallback((clickedRow: TableRowsProps) => {
    setRowsData((prev) => insertEmptyRow({ clickedRow, prevData: prev }));
  }, []);

  const columnRenderer = columns.map((col, index) => {
    if (col.headerName === Headings.MILLIONS) {
      return {
        ...col,
        cellRenderer: (params: ICellRendererParams) => {
          if (params.data.isOthersRow) {
            return (
              <div
                className="add-row"
                onClick={(e) => {
                  e.preventDefault();
                  addNewRowClickHandler(params.data);
                }}
              >
                {params.value}
                <FaPlusCircle />
              </div>
            );
          }
          return (
            <span className={params.data.isHeaderRow ? "bold" : ""}>
              {params.value}
            </span>
          );
        },
      };
    }
    return col;
  });

  return (
    <StyledContainer>
      <Header />
      <Table
        columnDefs={columnRenderer}
        rowsData={rowsData}
        onCellValueChanged={valueChangeHandler}
      />
    </StyledContainer>
  );
};

export default FinancialStatement;
