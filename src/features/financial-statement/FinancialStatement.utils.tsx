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

  rowsData.forEach((row) => {
    if (row.type === ROW_TYPE.REVENUE) {
      totalRevenue2021 += parseFloat(row["year2021"].replace(/,/g, "") || "0");
      totalRevenue2022 += parseFloat(row["year2022"].replace(/,/g, "") || "0");
      totalRevenue2024 += parseFloat(row["year2024"].replace(/,/g, "") || "0");
    } else if (row.type === ROW_TYPE.EXPENSE) {
      totalExpense2021 += parseFloat(row["year2021"].replace(/,/g, "") || "0");
      totalExpense2022 += parseFloat(row["year2022"].replace(/,/g, "") || "0");
    }
  });

  const updatedData = [...rowsData];
  const totalRevenueRow = updatedData.find(
    (row) => row.type === ROW_TYPE.TOTAL_REVENUE
  );
  if (totalRevenueRow) {
    totalRevenueRow["year2021"] = totalRevenue2021.toFixed(2);
    totalRevenueRow["year2022"] = totalRevenue2022.toFixed(2);
    totalRevenueRow["year2024"] = totalRevenue2024.toFixed(2);
  }

  const totalExpenseRow = updatedData.find(
    (row) => row.type === ROW_TYPE.TOTAL_EXPENSE
  );
  if (totalExpenseRow) {
    totalExpenseRow["year2021"] = totalExpense2021.toFixed(2);
    totalExpenseRow["year2022"] = totalExpense2022.toFixed(2);
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
      const val2022 = parseFloat(
        changedData["year2022"].replace(/,/g, "") || "0"
      );
      const val2024 = parseFloat(
        changedData["year2024"].replace(/,/g, "") || "0"
      );

      clone[rowIndex]["varianceRow"] = calcVariance(val2022, val2024);
      clone[rowIndex]["variancePercentRow"] = calcVariancePercent(
        val2022,
        val2024
      );
    }

    return clone;
  }

  return rowsData;
};
