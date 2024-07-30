import { TableRowsProps } from "../common/table/Table.type";
import { ROW_TYPE } from "./FinancialStatement.config";

export const calcVariance = (
  previousYear: number,
  currentYear: number
): string => {
  const variance = (currentYear - previousYear).toFixed(2);
  return variance === "0.00" ? "" : variance;
};

export const calcVariancePercent = (
  previousYear: number,
  currentYear: number
): string => {
  if (previousYear === 0) return "";

  const variance = calcVariance(previousYear, currentYear);
  const percentage = ((parseFloat(variance) / previousYear) * 100).toFixed(2);
  return percentage === "0.00" ? "" : `${percentage}%`;
};

export const updatedSum = (
  rowsData: TableRowsProps[],
  setRowsData: React.Dispatch<React.SetStateAction<TableRowsProps[]>>
) => {
  let totalRevenue2021 = 0;
  let totalRevenue2022 = 0;
  let totalRevenue2024 = 0;

  let totalExpense2021 = 0;
  let totalExpense2022 = 0;
  let totalExpense2024 = 0;

  rowsData.forEach((row) => {
    console.log(row);
    if (row.type === ROW_TYPE.REVENUE) {
      totalRevenue2021 += formattedNumber(row["year2021"]);
      totalRevenue2022 += formattedNumber(row["year2022"]);
      totalRevenue2024 += formattedNumber(row["year2024"]);
    } else if (row.type === ROW_TYPE.EXPENSE) {
      totalExpense2021 += formattedNumber(row["year2021"]);
      totalExpense2022 += formattedNumber(row["year2022"]);
      totalExpense2024 += formattedNumber(row["year2024"]);
    }
  });

  const updatedData = [...rowsData];
  const totalRevenueRow = updatedData.find(
    (row) => row.type === ROW_TYPE.TOTAL_REVENUE
  );
  if (totalRevenueRow) {
    totalRevenueRow["year2021"] = getFormattedValueOrEmpty(totalRevenue2021);
    totalRevenueRow["year2022"] = getFormattedValueOrEmpty(totalRevenue2022);
    totalRevenueRow["year2024"] = getFormattedValueOrEmpty(totalRevenue2024);
  }

  const totalExpenseRow = updatedData.find(
    (row) => row.type === ROW_TYPE.TOTAL_EXPENSE
  );
  if (totalExpenseRow) {
    totalExpenseRow["year2021"] = getFormattedValueOrEmpty(totalExpense2021);
    totalExpenseRow["year2022"] = getFormattedValueOrEmpty(totalExpense2022);
    totalExpenseRow["year2024"] = getFormattedValueOrEmpty(totalExpense2024);
  }

  setRowsData(updatedData);
};

export const updatedVariance = (
  changedData: TableRowsProps,
  rowsData: TableRowsProps[]
): TableRowsProps[] => {
  const rowIndex = rowsData.findIndex((row) => row.id === changedData.id);
  if (rowIndex !== -1) {
    const clone = [...rowsData];
    clone[rowIndex] = changedData;

    if (changedData.type === ROW_TYPE.REVENUE) {
      const year2022Val = parseFloat(
        changedData["year2022"].replace(/,/g, "") || "0"
      );
      const year2024Val = parseFloat(
        changedData["year2024"].replace(/,/g, "") || "0"
      );

      clone[rowIndex]["varianceRow"] = calcVariance(year2022Val, year2024Val);
      clone[rowIndex]["variancePercentRow"] = calcVariancePercent(
        year2022Val,
        year2024Val
      );
    }

    return clone;
  }

  return rowsData;
};

export const getFormattedValueOrEmpty = (value: number): string => {
  return value ? value.toFixed(2) : "";
};

export const formattedNumber = (value: string): number => {
  return parseFloat(value.replace(/,/g, "") || "0");
};
