// example
export const getAllUsers = async (req, res) => {
  res.status(200).json({ message: 'All users received' });
};

export const getCurrentUser = async (req, res) => {
  const { _id, name, avatarUrl, description } = req.user;

  res.status(200).json(
    {
      _id,
      name,
      description,
      avatarUrl
    }
  );
};
