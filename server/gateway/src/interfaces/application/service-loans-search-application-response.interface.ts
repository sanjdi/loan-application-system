import { Application } from "./application.interface";

export interface ServiceLoansSearchApplicationResponse {
  status: number;
  message: string;
  application: Application | null;
}