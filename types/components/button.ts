type DefaultBtnProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
};

export interface BtnProps extends DefaultBtnProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
}

export interface BtnLinkProps extends DefaultBtnProps {
  linkTo: string;
}
