// example
export const getAllUsers = async (req, res) => {
  res.status(200).json({ message: 'All users received' });
};

// TODO: getCurrentUserStories (need to shorten the const name) – this should give us all stories that current user has
// TODO: getSavedStories – should show stories user have saved

// so getCurrentUser gets us info about user 
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
