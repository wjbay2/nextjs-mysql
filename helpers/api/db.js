import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';

const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize
};

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.Product = productModel(sequelize);

    await sequelize.sync({ alter: true });

    db.initialized = true;
}

function productModel(sequelize) {
    const attributes = {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DOUBLE, allowNull: false }
    };

    return sequelize.define('Product', attributes);
}