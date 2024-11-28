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
        type: DataTypes.JSON, // Storing comments as an array of strings
        defaultValue: [],
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt columns
});

module.exports = Post;
