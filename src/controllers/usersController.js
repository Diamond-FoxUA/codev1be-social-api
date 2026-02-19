import { User } from '../models/user.js';

export const getAllUsers = async (req, res) => {
  res.status(200).json({ message: 'All users received' });
};

export const updateUser = async (req, res, next) => {
  try {
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
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
