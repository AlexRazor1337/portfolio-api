const { DataTypes, Model } = require('sequelize');

const User = require('./user');
const Image = require('./image');
const sequelize = require('../db');

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
