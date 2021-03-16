var sequelize = require('../db/connection');
const Sequelize = require('sequelize');


const mainAction = sequelize.define('main_action', {
    action_id: {
        type: Sequelize.SMALLINT, 
        primaryKey: true,
    },
    action_name: {
        type: Sequelize.STRING
    },
    actual_action: {
        type: Sequelize.STRING
    },
},{
    tableName: 'main_action',
    timestamps: false,
});

module.exports = mainAction;