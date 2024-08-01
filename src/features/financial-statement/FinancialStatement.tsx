import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../common/table/Table";
import Header from "../header/Header";
import {
  getInitialColumConfig,
  Headings,
  initRowsData,
  ROW_TYPE,
} from "./FinancialStatement.config";
import { ICellRendererParams } from "ag-grid-community";
import { FaPlusCircle } from "react-icons/fa";
import { StyledContainer } from "./FinancialStatement.style";
import { TableRowsProps } from "../common/table/Table.type";
import { v4 as uuidv4 } from "uuid";
import { updatedSum, updatedVariance } from "./FinancialStatement.utils";
import {
  NewRowsCountType,
  UserRoles,
  UserTypes,
} from "./FinancialStatement.type";
import { get } from "http";

export const FinancialStatement = () => {
  const queryParams = () => new URLSearchParams(window.location.search);
  const userType = queryParams().get("user");
  const user = useMemo(() => {
    if (userType && UserRoles[userType as UserTypes]) {
      return UserRoles[userType as UserTypes];
    }
    return UserRoles.guest;
  }, [userType]);

  const initColumnConfig = getInitialColumConfig(user);
  const [columns, setColumns] = useState(initColumnConfig);
  const [rowsData, setRowsData] = useState(initRowsData);
  const [addedRowsCount, setAddedRowsCount] = useState<NewRowsCountType>({
    EXPENSE: 0,
    REVENUE: 0,
  });

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
    const { type } = clickedRow;

    const clone = {
      ...addedRowsCount,
      [type as keyof NewRowsCountType]:
        addedRowsCount[type as keyof NewRowsCountType] + 1,
    };
    setAddedRowsCount(clone);
    const title = `Others ${
      type === ROW_TYPE.REVENUE ? "revenue" : "expense"
    } ${clone[type as keyof NewRowsCountType]}`;

    const emptyRow = {
      id: uuidv4(),
      million: title,
      year2021: "",
      year2022: "",
      year2024: "",
      variance: "",
      variancePercent: "",
      isChildRow: true,
      type,
    };

    // logic to insert an empty row
    const indexToInsert = prevData.findIndex(
      (row) => row.type === `TOTAL_${type}`
    );
    const rowDataCopy = [...prevData];
    rowDataCopy.splice(indexToInsert, 0, emptyRow);
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

  const addNewRowClickHandler = (clickedRow: TableRowsProps) => {
    setRowsData((prev) => insertEmptyRow({ clickedRow, prevData: prev }));
  };

  const columnRenderer = columns.map((col, index) => {
    if (col.headerName === Headings.MILLIONS) {
      return {
        ...col,
        cellRenderer: (params: ICellRendererParams) => {
          if (params.data.isOthersRow) {
            return (
              <div
                className="add-row"
                onClick={() => {
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
