export interface Share {
  id?: string;
  borrowerId: string;
  lenderId: string;
  itemId: string;
  status: string;
  requestDate: string;
  approveDate: string;
  shareDate?: string;
  returnDate?: string;
}