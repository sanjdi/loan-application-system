export class CreateApplicationResponseDto {
  readonly applicationApproval: {
    approvalStatus: string;
    approvalScore: number;
  };
}
