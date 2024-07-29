import Button from "../common/button/Button";
import {
  StyledButtonContainer,
  StyledH1,
  StyledNav,
  StyledActionsContainer,
} from "./Header.style";
import { CiCircleMore, CiCirclePlus, CiSettings } from "react-icons/ci";

export const Header = () => {
  return (
    <header>
      <StyledH1>Financial statement</StyledH1>
      <StyledActionsContainer>
        <StyledNav>
          <ul>
            <li className="active">Profit & Loss</li>
            <li>Balance Sheet</li>
            <li>Cashflow</li>
            <li>Ratio</li>
          </ul>
        </StyledNav>
        <StyledButtonContainer>
          <Button icon={<CiCirclePlus />} label="Add coloumn" />
          <Button icon={<CiCircleMore />} label="Insert comment" />
          <Button icon={<CiSettings />} label="Update columns" />
        </StyledButtonContainer>
      </StyledActionsContainer>
    </header>
  );
};

export default Header;
