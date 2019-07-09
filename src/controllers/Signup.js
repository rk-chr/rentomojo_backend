import md5 from 'md5';

const signupController = async (req, res) => {
    const { username, password } = req.body;
    const redis = req.app.get('redis');
    if (username && password) {
        const checkUser = await redis.hexists('users', username);
        if (checkUser) return res.status(400).json({ error: true, msg: 'Uh no! But username already taken.' });
        const userObj = JSON.stringify({
            username,
            password: md5(password),
        });
        await redis.hset('users', username, userObj);
        return res.status(200).json({ error: false, msg: 'You\'ve registered successfully. You can login now.' });
    } return res.status(400).json({ error: true, msg: 'Enter username and password.' });
};

export default signupController;
