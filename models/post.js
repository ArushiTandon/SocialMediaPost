const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    comments: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
}, {
    timestamps: true, 
});

module.exports = Post;
