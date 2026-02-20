import { User } from '../models/user.js';

// example
export const getAllUsers = async (req, res) => {
  res.status(200).json({ message: 'All users received' });
};

export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { name, description } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, description },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({
    status: 'success',
    name: updatedUser.name,
    description: updatedUser.description,
  });
};

export const getCurrentUser = async (req, res) => {
  const { _id, name, avatarUrl, description } = req.user;

  res.status(200).json({
    _id,
    name,
    description,
    avatarUrl,
  });
};
