export class CreateShareDto {
  readonly borrowerId: string;
  readonly lenderId: string;
  readonly itemId: string;
  readonly status: string;
  readonly requestDate: string;
  readonly approveDate: string;
  readonly shareDate: string;
  readonly returnDate: string;
}