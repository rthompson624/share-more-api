import * as mongoose from 'mongoose';

export const ShareSchema = new mongoose.Schema({
  borrowerId: String,
  lenderId: String,
  itemId: String,
  status: String,
  requestDate: String,
  approveDate: String,
  shareDate: String,
  returnDate: String
});
