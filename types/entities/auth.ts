export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  username: string;
} & LoginParams;
