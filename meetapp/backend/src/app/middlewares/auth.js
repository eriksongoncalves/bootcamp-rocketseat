import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authorization.split(' ');

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalid' });
        }

        req.userId = decoded.id;
    });

    return next();
}