export interface ItemQuery {
  limit?: number;
  skip?: number;
  ownerId?: string;
  type?: string;
  name?: string;
  description?: string;
}
