import { StyledButton } from "./Button.style";

type ButtonProps = {
  icon?: string | React.ReactNode;
  label: string;
};

export const Button = ({ icon, label }: ButtonProps) => {
  return (
    <StyledButton>
      {icon}
      {label}
    </StyledButton>
  );
};
export default Button;
