export const getAllUsers = async (req, res) => {
  res.status(200).json({ message: 'All users received' });
};

export const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};
