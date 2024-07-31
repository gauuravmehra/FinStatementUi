import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: #fff;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 1px solid #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 1px 4px 0px;

  svg {
    margin-right: 0.25rem;
    font-size: 1.25rem;
  }

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
  }

  &:active {
    box-shadow: none;
  }
`;
