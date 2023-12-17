import { ApplicationApproval } from "../application-approval.interface";

export class CreateApplicationResponseDto {
  message: string;
  data: {
    approval: ApplicationApproval;
  }
  errors: { [key: string]: any };
}
