import { ApplicationApproval } from "../application-approval.interface";
import { ApplicationPreAssessment } from "../application-preassement.interface";

export class CreateApplicationResponseDto {
  message: string;
  data: {
    approval: ApplicationApproval;
    preAssessment: ApplicationPreAssessment;
  }
  errors: { [key: string]: any };
}
