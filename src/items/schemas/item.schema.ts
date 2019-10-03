import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  description: String
}, {
  timestamps: true
});
