import { sequelize } from '../common/db';
import { DataTypes } from 'sequelize';

const resetToken = sequelize.define('resetToken', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    expiresAt:{
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    freezeTableName: true,
}) 

sequelize.sync();
export default resetToken;