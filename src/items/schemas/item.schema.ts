import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  description: String,
  picUrl: String,
}, {
  timestamps: true,
});
