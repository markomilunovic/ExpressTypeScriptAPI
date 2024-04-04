import { sequelize } from '../common/db';
import { DataTypes } from 'sequelize';

const users = sequelize.define('users', {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username:{
        allowNull: false,
        type: DataTypes.STRING,
      },
      password:{
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstName:{
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
     
    },
    {
      tableName: 'users',
      timestamps: false,
      freezeTableName: true
    });

sequelize.sync();

export default users;