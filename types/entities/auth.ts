export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
} & LoginParams;
