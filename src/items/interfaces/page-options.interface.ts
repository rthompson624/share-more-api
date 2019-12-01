export interface PageOptions {
  collation: {
    locale: string;
  };
  sort: {
    name: number;
  };
  limit: number;
  skip: number;
}
