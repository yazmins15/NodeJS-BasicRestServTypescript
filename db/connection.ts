import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

export default db;


