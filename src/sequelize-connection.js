import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    database: 'basehub',
    dialect: 'mysql',
    replication: {
        read: {
            host: 'localhost'
        },
        write: {
            host: 'localhost'
        }
    },
    username: 'root',
    password: 'muja@examly',
    modelPaths: [__dirname + '/model'],
    pool: {
        max: 200,
        min: 0,
        idle: 20000,
        acquire: 20000,
        evict: 5000,
        handleDisconnects: true,
    },
    retry: {
        match: [
            'Sequelize.ConnectionError',
            'Sequelize.ConnectionRefusedError',
            'Sequelize.ConnectionTimedOutError',
            'Sequelize.TimeoutError',
            '/Deadlock/i',
        ],
        max: 2,
    },
});

export default sequelize;
