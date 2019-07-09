import jwt from 'jsonwebtoken';

const secret = '(:RentoMojo:)';

export const issueToken = (payload) => jwt.sign(payload, secret, { expiresIn: 432000 });
export const verifyToken = (token, cb) => jwt.verify(token, secret, {}, cb);
