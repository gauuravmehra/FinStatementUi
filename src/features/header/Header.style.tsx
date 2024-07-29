import styled from "styled-components";

export const StyledH1 = styled.h1`
  font-size: 1em;
`;

export const StyledNav = styled.nav`
  display: flex;
  margin: 1rem 0;

  ul {
    display: flex;
    list-style-type: none;

    li {
      font-size: 0.875rem;
      padding: 0.25rem 1rem;
      border: 1px solid #c0c0c0;
      box-shadow: rgba(99, 99, 99, 0.1) 0px 1px 4px 0px;

      &:not(:last-child) {
        border-right: 1px solid transparent;
      }

      &:first-child {
        border-radius: 2px 0 0 2px;
      }

      &:last-child {
        border-radius: 0 2px 2px 0;
      }

      &.active {
        color: #ff8181;
        border-color: #ff8181;
      }
    }
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`;
export const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
