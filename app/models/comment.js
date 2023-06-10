const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

const User = require('./user');
const Image = require('./image');

class Comment extends Model {}

Comment.init({
    text: DataTypes.STRING,
}, {
    sequelize,
});

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Comment.belongsTo(Image, { foreignKey: 'imageId' });
Image.hasMany(Comment, { foreignKey: 'imageId' });


module.exports = Comment;
