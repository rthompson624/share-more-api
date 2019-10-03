export interface ItemQuery {
  limit?: number;
  skip?: number;
  ownerId?: string;
  name?: string;
  description?: string;
}