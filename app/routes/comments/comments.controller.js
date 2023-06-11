const Comment = require('@/models/comment');
const { BadRequestException, NotFoundException } = require('@/exceptions');

const createComment = ({ id: userId, imageId, text }) => {
    return Comment.create({
        imageId,
        userId,
        text,
    }).catch(() => {
        throw new BadRequestException('Error creating comment');
    });
};

const deleteComment = async ({ id: userId, commentId }) => {
    const isDeleted = await Comment.destroy({
        where: {
            id: commentId,
            userId,
        },
    });

    if (!isDeleted) throw new NotFoundException('Comment not found');
    return { message: 'Comment deleted' };
};

module.exports = {
    createComment,
    deleteComment,
};
