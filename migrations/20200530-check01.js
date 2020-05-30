'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('check01', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('check01');
    }
};
