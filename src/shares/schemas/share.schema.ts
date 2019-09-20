import * as mongoose from 'mongoose';

export const ShareSchema = new mongoose.Schema({
  borrowerId: String,
  lenderId: String,
  itemId: String,
  status: String,
  requestDate: String,
  shareDate: String,
  returnDate: String
});
