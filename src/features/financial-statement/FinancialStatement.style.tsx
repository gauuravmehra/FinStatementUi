import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 1024px;
  margin: 0 auto;

  .bold {
    font-weight: bold;
  }

  .bordered {
    border-top-color: black;
  }

  .child-row {
    text-indent: 2rem;
  }

  .add-row {
    cursor: pointer;
    svg {
      margin-left: 0.25rem;
      font-size: 1.25rem;
      vertical-align: middle;
    }
  }
`;
