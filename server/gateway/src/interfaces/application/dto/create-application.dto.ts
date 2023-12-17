import { IsDefined, IsInt, IsString } from "class-validator";

export class CreateApplicationDto {
  @IsString({ message: 'Company Id should be a valid string' })
  @IsDefined({ message: 'Company Id cannot be null' })
  readonly companyId: string;

  @IsInt({ message: 'Loan Amount should be a valid number' })
  @IsDefined({ message: 'Loan Amount cannot be null' })
  readonly loanAmount: number;

  @IsString({ message: 'Date Founded should be a valid string' })
  @IsDefined({ message: 'Date Founded cannot be null' })
  readonly dateFounded: string;
}
