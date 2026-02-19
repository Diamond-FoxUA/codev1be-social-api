import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
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
  },
);

export const Story = mongoose.model("Story", storySchema);
