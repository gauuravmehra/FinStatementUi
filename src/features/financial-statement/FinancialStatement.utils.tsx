import { parse } from "path";
import { TableRowsProps } from "../common/table/Table.type";
import { ROW_TYPE } from "./FinancialStatement.config";
import { NewRowsCountType } from "./FinancialStatement.type";

export const calcVariance = (
  previousYear: number,
  currentYear: number
): string => {
  const variance = (currentYear - previousYear).toFixed(2);
  return variance === "0.00" ? "" : formatNumberWithCommas(variance);
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

export const updatedSum = (rowsData: TableRowsProps[]): TableRowsProps[] => {
  // fields to sum
  let totalRevenue2021 = 0;
  let totalRevenue2022 = 0;
  let totalRevenue2024 = 0;

  let totalVariance = 0;
  let totalVariancePercent = 0;

  let totalExpense2021 = 0;
  let totalExpense2022 = 0;
  let totalExpense2024 = 0;

  rowsData.forEach((row) => {
    if (row.type === ROW_TYPE.REVENUE) {
      totalRevenue2021 += formattedNumber(row["year2021"]);
      totalRevenue2022 += formattedNumber(row["year2022"]);
      totalRevenue2024 += formattedNumber(row["year2024"]);
      if (row["year2022"] && row["year2024"]) {
        totalVariance += formattedNumber(row?.variance || "0");
        totalVariancePercent += formattedNumber(row?.variancePercent || "0");
      }
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

    totalRevenueRow["variance"] = getFormattedValueOrEmpty(totalVariance);
    totalRevenueRow["variancePercent"] =
      getFormattedValueOrEmpty(totalVariancePercent);
  }

  const totalExpenseRow = updatedData.find(
    (row) => row.type === ROW_TYPE.TOTAL_EXPENSE
  );
  if (totalExpenseRow) {
    totalExpenseRow["year2021"] = getFormattedValueOrEmpty(totalExpense2021);
    totalExpenseRow["year2022"] = getFormattedValueOrEmpty(totalExpense2022);
    totalExpenseRow["year2024"] = getFormattedValueOrEmpty(totalExpense2024);
  }
  return updatedData;
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
      const year2022Val = changedData["year2022"]
        ? formattedNumber(changedData["year2022"])
        : 0;
      const year2024Val = changedData["year2024"]
        ? formattedNumber(changedData["year2024"])
        : 0;

      clone[rowIndex]["variance"] = calcVariance(year2022Val, year2024Val);
      clone[rowIndex]["variancePercent"] = calcVariancePercent(
        year2022Val,
        year2024Val
      );
    }
    return clone;
  }
  return rowsData;
};

export const getFormattedValueOrEmpty = (value: number): string => {
  return value ? formatNumberWithCommas(value) : "";
};

export const formattedNumber = (value: string): number => {
  return value ? Number(parseFloat(value?.replace(/[^0-9.-]/g, "") || "0")) : 0;
};

export const formatNumberWithCommas = (value: number | string): string => {
  let val = typeof value === "number" ? value.toString() : value;
  val = val.replace(/,/g, "");
  let parts = parseFloat(val).toFixed(2);
  let partsArr = parts.split(".");
  return (
    partsArr[0]?.replace(/\B(?=(\d{3})+(?=$))/g, ",") +
    (partsArr[1] ? `.${partsArr[1]}` : `.00`)
  );
};
