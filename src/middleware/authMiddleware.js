export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  // Пока просто сохраняем токен в req.user
  // (чтобы не ломался getCurrentUser)
  req.user = { token };

  next();
};
