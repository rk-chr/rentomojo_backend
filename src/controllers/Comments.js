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
    const voteForComment = async (req, res) => {
        const redis = req.app.get('redis');
        const { user } = req.token;
        const { id, up, down } = req.body;
        const getData = await redis.get('comments');
        const comments = getData ? JSON.parse(getData) : [];
        const [votedComment] = comments.filter((co) => (co.id === id));
        const otherComments = comments.filter((co) => (co.id !== id));
        if (up === 1) {
            const obj = {
                ...votedComment,
                up: (votedComment.up.includes(user))
                    ? votedComment.up : [...votedComment.up, user],
            };
            const newData = [obj, ...otherComments];
            await redis.set('comments', JSON.stringify(newData));
            res.status(200).json({ comments: newData });
        }
        if (down === 1) {
            const obj = {
                ...votedComment,
                down: (votedComment.down.includes(user))
                    ? votedComment.down : [...votedComment.down, user],
            };
            const newData = [obj, ...otherComments];
            await redis.set('comments', JSON.stringify(newData));
            res.status(200).json({ comments: newData });
        }
    };
    return {
        getComments,
        postComments,
        voteForComment
    };
};

export default commentsController;