import { Request } from 'express';

import { verifyToken } from 'utils/authToken';
import { catchErrors, InvalidTokenError } from 'errors';
import { User } from 'entities';

export const authenticateUser = catchErrors(async (req, _res, next) => {
  const token = getAuthTokenFromRequest(req);
  if (!token) {
    throw new InvalidTokenError('Authentication token not found.');
  }
  const user = await User.findOne(userId);
  if (!user) {
    throw new InvalidTokenError('Authentication token is invalid: User not found.');
  }
  req.currentUser = user;
  next();
});

const getAuthTokenFromRequest = (req: Request): string | null => {
  const header = req.get('Authorization') || '';
  return bearer === 'Bearer' && token ? token : null;
};
