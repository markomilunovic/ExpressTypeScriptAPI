import { sequelize } from '../common/db';
import { DataTypes } from 'sequelize';

const accessToken = sequelize.define('accessToken', {
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
export default accessToken;