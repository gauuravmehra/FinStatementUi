import styled from "styled-components";

export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  height: 800px;

  &.stripped {
    .ag-row {
      > div:nth-child(odd) {
        background: rgba(162, 162, 162, 0.2);
      }
    }
  }

  .ag-header-cell-label {
    font-weight: bold;
  }

  .ag-row div[col-id="variance"],
  .ag-row div[col-id="variancePercentage"] {
    &.error {
      color: red;
    }
    &.success {
      color: green;
    }
  }
`;
