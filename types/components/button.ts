type DefaultBtnProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "loading";
  fullWidth?: boolean;
  className?: string;
  isLoading?: boolean | undefined;
};

export type BtnProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
} & DefaultBtnProps;

export type BtnLinkProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  linkTo: string;
} & DefaultBtnProps;
