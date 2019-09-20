export interface Share {
  id?: string;
  borrowerId: string;
  lenderId: string;
  itemId: string;
  status: string;
  requestDate: string;
  shareDate?: string;
  returnDate?: string;
}