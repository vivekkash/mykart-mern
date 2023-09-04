import jsonwebtoken from 'jsonwebtoken';

export const verify = (req, res, next) => {
  const token = req.headers.authorization?.slice(7);
  if (!token)
    return res.status(401).json({ error: 'Missing or Invalid Token' });

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};
