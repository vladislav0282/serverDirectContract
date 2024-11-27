import sequelize from '../sequelize.js'
import database from 'sequelize'

const { DataTypes } = database

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    gender: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    
})