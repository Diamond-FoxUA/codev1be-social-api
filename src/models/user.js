import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    articlesAmount: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const User = model('User', userSchema);
