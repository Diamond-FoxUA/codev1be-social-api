import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
        name: {
          type: String,
          required: true,
          trim: true
        },
        avatarUrl: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        articlesAmount: {
            type: Number,
            default: 0
        },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
