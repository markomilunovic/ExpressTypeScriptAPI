import { sequelize } from '../common/db';
import { DataTypes } from 'sequelize';

const refreshToken = sequelize.define('refreshToken', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    accessTokenId:{
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
export default refreshToken;