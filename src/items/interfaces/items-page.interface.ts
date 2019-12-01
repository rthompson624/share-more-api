import { Item } from './item.interface';

export interface ItemsPage {
  total: number;
  limit: number;
  skip: number;
  data: Item[];
}
