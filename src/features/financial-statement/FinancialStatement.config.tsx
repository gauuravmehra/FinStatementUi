import {
  ColDef,
  ValueGetterParams,
  ValueParserParams,
} from "ag-grid-community";
import { TableRowsProps } from "../common/table/Table.type";
import { v4 as uuidv4 } from "uuid";
import {
  calcVariance,
  calcVariancePercent,
  formatNumberWithCommas,
} from "./FinancialStatement.utils";

export const ROW_TYPE = {
  HEADER: "HEADER",
  GENERAL_INFO: "GENERAL_INFO",
  REVENUE: "REVENUE",
  TOTAL_REVENUE: "TOTAL_REVENUE",
  EXPENSE: "EXPENSE",
  TOTAL_EXPENSE: "TOTAL_EXPENSE",
};

export const Headings = {
  MILLIONS: "(million)",
  YEAR_2021: "31-12-2021",
  YEAR_2022: "31-12-2022",
  YEAR_2024: "31-12-2024",
  VARIANCE: "Variance",
  VARIANCE_PERCENT: "Variance %",
};

export const initRowsData: TableRowsProps[] = [
  {
    id: uuidv4(),
    million: "Accounting standard",
    year2021: "IFRS",
    year2022: "IFRS",
    year2024: "IFRS",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.GENERAL_INFO,
  },
  {
    id: uuidv4(),
    million: "Audit method",
    year2021: "IFRS16 Adj",
    year2022: "IFRS16 Adj",
    year2024: "IFRS16 Adj",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.GENERAL_INFO,
  },
  {
    id: uuidv4(),
    million: "Display currency",
    year2021: "HKD",
    year2022: "HKD",
    year2024: "HKD",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.GENERAL_INFO,
  },
  {
    id: uuidv4(),
    million: "FX rate",
    year2021: "0.12826",
    year2022: "0.12826",
    year2024: "0.12826",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.GENERAL_INFO,
  },
  {
    id: uuidv4(),
    million: "Revenue",
    year2021: "",
    year2022: "",
    year2024: "",
    variance: "",
    variancePercent: "",
    isHeaderRow: true,
    type: ROW_TYPE.HEADER,
  },
  {
    id: uuidv4(),
    million: "Passenger",
    year2021: "4,357.00",
    year2022: "14,333.00",
    year2024: "15,213.00",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.REVENUE,
  },
  {
    id: uuidv4(),
    million: "Cargo",
    year2021: "35,814.00",
    year2022: "30,554.00",
    year2024: "29,312.00",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.REVENUE,
  },
  {
    id: uuidv4(),
    million: "Others",
    year2021: "",
    year2022: "",
    year2024: "",
    variance: "",
    variancePercent: "",
    isOthersRow: true,
    type: ROW_TYPE.REVENUE,
  },
  {
    id: uuidv4(),
    million: "Catering, recoveries and...",
    year2021: "5,416.00",
    year2022: "6,149.00",
    year2024: "5,236.00",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.REVENUE,
  },
  {
    id: uuidv4(),
    million: "",
    year2021: "",
    year2022: "",
    year2024: "",
    variance: "",
    variancePercent: "",
    isTotalRow: true,
    type: ROW_TYPE.TOTAL_REVENUE,
  },
  {
    id: uuidv4(),
    million: "Operating expense",
    year2021: "",
    year2022: "",
    year2024: "",
    variance: "",
    variancePercent: "",
    isHeaderRow: true,
    type: ROW_TYPE.HEADER,
  },
  {
    id: uuidv4(),
    million: "Fuel",
    year2021: "4,357.00",
    year2022: "14,333.00",
    year2024: "",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.EXPENSE,
  },
  {
    id: uuidv4(),
    million: "Labour",
    year2021: "35,814.00",
    year2022: "30,554.00",
    year2024: "",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.EXPENSE,
  },
  {
    id: uuidv4(),
    million: "Landing fees and route charges",
    year2021: "35,814.00",
    year2022: "30,554.00",
    year2024: "",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.EXPENSE,
  },
  {
    id: uuidv4(),
    million: "Maintenance, materials and...",
    year2021: "35,814.00",
    year2022: "30,554.00",
    year2024: "",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.EXPENSE,
  },
  {
    id: uuidv4(),
    million: "Others",
    year2021: "",
    year2022: "",
    year2024: "",
    variance: "",
    variancePercent: "",
    isOthersRow: true,
    type: ROW_TYPE.EXPENSE,
  },
  {
    id: uuidv4(),
    million: "Inflight and passenger...",
    year2021: "5,416.00",
    year2022: "6,149.00",
    year2024: "",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.EXPENSE,
  },
  {
    id: uuidv4(),
    million: "Restructuring costs",
    year2021: "385.00",
    year2022: "",
    year2024: "",
    variance: "",
    variancePercent: "",
    type: ROW_TYPE.EXPENSE,
  },
  {
    id: uuidv4(),
    million: "",
    year2021: "",
    year2022: "",
    year2024: "",
    variance: "",
    variancePercent: "",
    isTotalRow: true,
    type: ROW_TYPE.TOTAL_EXPENSE,
  },
];

export const getInitialColumConfig = (user: string): ColDef[] => [
  {
    headerName: Headings.MILLIONS,
    field: "million",
    width: 230,
    cellClass: (params) => (params.data.isChildRow ? "child-row" : ""),
  },
  {
    headerName: Headings.YEAR_2021,
    field: "year2021",
    width: 160,
    editable: false,
    cellClass: (params) => (params.data.isTotalRow ? "bold bordered" : ""),
    onCellValueChanged: (params) => {
      const newVal = params.newValue
        ? formatNumberWithCommas(params.newValue)
        : 0;
      params.data.year2021 = newVal;
      return newVal;
    },
  },
  {
    headerName: Headings.YEAR_2022,
    field: "year2022",
    width: 160,
    editable: false,
    cellClass: (params) => (params.data.isTotalRow ? "bold bordered" : ""),
    onCellValueChanged: (params) => {
      const newVal = params.newValue
        ? formatNumberWithCommas(params.newValue)
        : 0;
      params.data.year2022 = newVal;
      return newVal;
    },
  },
  {
    headerName: Headings.YEAR_2024,
    field: "year2024",
    width: 160,
    editable: (params) => !params.data.isTotalRow && user === "Analyst",
    cellClass: (params) => (params.data.isTotalRow ? "bold bordered" : ""),
    valueParser: (params: ValueParserParams): number | string => {
      let newValue = params.newValue.replace(/,/g, "");
      return Number.isNaN(Number(newValue))
        ? params.oldValue
        : formatNumberWithCommas(newValue);
    },
    onCellValueChanged: (params) => {
      const newVal = params.newValue
        ? formatNumberWithCommas(params.newValue)
        : 0;
      params.data.year2024 = newVal;
      return newVal;
    },
  },
  {
    headerName: Headings.VARIANCE,
    field: "variance",
    width: 160,
    editable: false,
    cellClass: (params) => {
      if (params.data.isTotalRow) {
        return parseFloat(params.value) < 0
          ? "bold bordered error"
          : "bold bordered success";
      }
      return parseFloat(params.value) < 0 ? "error" : "success";
    },
    valueGetter: (params: ValueGetterParams) => {
      if (params.data.type === ROW_TYPE.REVENUE) {
        const val2022 = parseFloat(
          params.data["year2022"]?.replace(/,/g, "") || "0"
        );
        const val2024 = parseFloat(
          params.data["year2024"]?.replace(/,/g, "") || "0"
        );
        if (val2022 === 0) return "";
        const val = calcVariance(val2022, val2024);
        params.data.variance = val;
        return val;
      }
      return params.data.variance;
    },
  },
  {
    headerName: Headings.VARIANCE_PERCENT,
    field: "variancePercent",
    width: 160,
    editable: false,
    cellClass: (params) => {
      if (params.data.isTotalRow) {
        return parseFloat(params.value) < 0
          ? "bold bordered error"
          : "bold bordered success";
      }
      return parseFloat(params.value) < 0 ? "error" : "success";
    },
    valueGetter: (params: ValueGetterParams) => {
      if (
        params.data.type === ROW_TYPE.REVENUE &&
        params.data.million !== "Others"
      ) {
        if (params.data.type === ROW_TYPE.REVENUE) {
          const val2022 = parseFloat(
            params.data["year2022"]?.replace(/,/g, "") || "0"
          );
          const val2024 = parseFloat(
            params.data["year2024"]?.replace(/,/g, "") || "0"
          );
          if (val2022 === 0) return "";
          const val = calcVariancePercent(val2022, val2024);
          params.data.variancePercent = val;
          return val;
        }
      }
      return params.data.variancePercent;
    },
  },
];
