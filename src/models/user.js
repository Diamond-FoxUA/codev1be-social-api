import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
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
    required: false,
    default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
  },
  articlesAmount: {
    type: Number,
  },
  description: {
    type: String,
    required: false,
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model('User', userSchema);
