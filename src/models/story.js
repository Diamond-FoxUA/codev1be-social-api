import mongoose, {Schema} from "mongoose";

const storySchema = new Schema({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  article: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  favoriteCount: {
    type: Number,
    required: false,
    default: 0,
  }
});

export const Story = mongoose.model("Story", storySchema);
