var sequelize = require('../db/conection');
const Sequelize = require('sequelize');


const Action = sequelize.define('action', {
    id_action: {
        type: Sequelize.SMALLINT, 
        primaryKey: true,
    },
    action_name: {
        type: Sequelize.STRING
    },
},{
    tableName: 'action',
    timestamps: false,
});

module.exports = Action;