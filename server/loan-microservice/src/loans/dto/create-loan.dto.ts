import { IsDefined, IsInt, IsString } from "class-validator";

export class CreateLoanDto {
  @IsString({ message: 'Company Id should be a valid string' })
  @IsDefined({ message: 'Company Id cannot be null' })
  company_id: string;

  @IsInt({ message: 'Amount should be a valid number' })
  @IsDefined({ message: 'Amount Id cannot be null' })
  readonly amount: number;

  @IsString({ message: 'Status should be a valid string' })
  status?: string;

  @IsString({ message: 'Date Applied should be a valid string' })
  dateApplied?: string;

  @IsInt({ message: 'Approved Amount should be a valid number' })
  approvedAmount: number;
}
