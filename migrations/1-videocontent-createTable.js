'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('videocontents', {

            contentId: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            thumbnailLink: {
                type: Sequelize.STRING,
                defaultValue: null,
                allowNull: true,
            },
            link: {
                type: Sequelize.STRING,
                defaultValue: null,
                allowNull: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            views: {
                type: Sequelize.INTEGER,
                unique: false,
                allowNull: false,
                defaultValue: 0
            },
            type: {
                type: Sequelize.ENUM('movies', 'tvseries', 'netflix', 'youtube', 'prime'),
                allowNull: false
            },
            duration: {
                type: Sequelize.INTEGER,
                unique: false,
                allowNull: false,
                defaultValue: 0
            },
            createdAt: {
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                allowNull: false,
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('videocontents');
    }
};
