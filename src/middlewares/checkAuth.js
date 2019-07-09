import { verifyToken } from '../services/auth';

export default (req, res, next) => {
    let tokenToVerify;

    if (req.header('Authorization')) {
        const parts = req.header('Authorization').split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/.test(scheme)) {
                tokenToVerify = credentials;
            } else {
                return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
            }
        } else {
            return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
        }
    }

    return verifyToken(tokenToVerify, (err, thisToken) => {
        if (err) {
            return res.status(401).json({
                status: 'invalid token',
            });
        }
        req.token = thisToken;
        console.log(thisToken);
        return next();
    });
};
