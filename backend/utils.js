import jsonwebtoken from 'jsonwebtoken';

export const generateToken = ({ id, name, email, isAdmin }) => {
  return jsonwebtoken.sign(
    { id, name, email, isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
