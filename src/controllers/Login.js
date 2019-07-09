import md5 from 'md5';
import { issueToken } from '../services/auth';

const loginController = async (req, res) => {
    try {
        const redis = req.app.get('redis');
        const { username, password } = req.body;
        const userExists = await redis.hget('users', username);
        if (!userExists) return res.status(404).json({ error: true, msg: 'User doesn\'t exist. Please signup.' });
        const { password: userPass, ...other } = JSON.parse(userExists);
        if (md5(password) === userPass) {
            return res.status(200).json({ token: await issueToken({ user: username }), user: other });
        }
        return res.status(400).json({ error: true, msg: 'Invalid username/password' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, msg: 'Internal server error' });
    }
};

export default loginController;
