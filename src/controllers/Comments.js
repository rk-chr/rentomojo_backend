const commentsController = () => {
    const getComments = async (req, res) => {
        const redis = req.app.get('redis');
        const getData = await redis.get('comments');
        const comments = getData ? JSON.parse(getData) : [];
        return res.status(200).json({ comments });
    };
    const postComments = async (req, res) => {
        const redis = req.app.get('redis');
        const { user } = req.token;
        const { comment } = req.body;
        const getData = await redis.get('comments');
        const comments = getData ? JSON.parse(getData) : [];
        const commentObj = {
            id: comments.length + 1,
            comment,
            by: user,
            up: [],
            down: [],
            date: new Date(),
        };
        const newData = [...comments, commentObj];
        redis.set('comments', JSON.stringify(newData));
        return res.status(200).json({ comments: newData });
    };
    return {
        getComments,
        postComments,
    };
};

export default commentsController;