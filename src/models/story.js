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
  },
);

export const Story = mongoose.model("Story", storySchema);
