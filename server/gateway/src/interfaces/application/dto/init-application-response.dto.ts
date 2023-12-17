import { AccountingProvider } from "../../accounting-providers/accounting-provider.interface";
import { Business } from "../../org/business.interface";

export class InitApplicationResponseDto {
  message: string;
  data: {
    companies: Business[];
    accountingProviders: AccountingProvider[];
  }
  errors: { [key: string]: any };
}
