import { sequelize } from '../common/db';
import { DataTypes } from 'sequelize';

const todoItem = sequelize.define('todoItems', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending'
    },
    imagePath: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
});

sequelize.sync();
export default todoItem;

