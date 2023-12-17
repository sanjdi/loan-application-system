import { Optional } from "@nestjs/common";
import { IsDefined, IsInt, IsString } from "class-validator";

export class UpdateApplicationDto {
  @IsString({ message: 'Application Id should be a valid string' })
  @IsDefined({ message: 'Application Id cannot be null' })
  id: string;

  @IsString({ message: 'Loan Amount should be a valid number' })
  @IsDefined({ message: 'Loan Amount cannot be null' })
  readonly loanAmount: number;
}
