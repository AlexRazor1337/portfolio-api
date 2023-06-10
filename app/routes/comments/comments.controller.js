const Comment = require('@/models/comment');

const createComment = ({ id: userId, imageId, text }) => {
    return Comment.create({
        imageId,
        userId,
        text,
    }).catch(() => {
        throw new Error('Error creating comment');
    });
};

const deleteComment = async ({ id: userId, commentId }) => {
    const isDeleted = await Comment.destroy({
        where: {
            id: commentId,
            userId,
        },
    });

    if (!isDeleted) throw new Error('Comment not found');
    return { message: 'Comment deleted' };
};

module.exports = {
    createComment,
    deleteComment,
};
