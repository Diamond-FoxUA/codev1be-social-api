import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
    savedArticles: [{
      story: {
        type: mongoose.Types.ObjectId,
        ref: "Story",
      },
      savedAt: {
        type: Date,
        default: Date.now,
      }
    }],
    description: {
      type: String,
      trim: true,
    }
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model('User', userSchema);
