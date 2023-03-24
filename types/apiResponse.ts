import { AxiosPromise } from "axios";

export type APIResponse<TData> = AxiosPromise<{
  message: string;
  results: TData[];
  response: {
    docs: TData[]
  } ;
}>;
