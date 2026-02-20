import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favouriteCount: {
      type: Number,
      default: 0
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      default: () => new Date().toISOString().split('T')[0],
    },
  });

export const Story = mongoose.model('Story', storySchema);
