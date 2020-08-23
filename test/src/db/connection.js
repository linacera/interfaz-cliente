const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

const sequelize = new Sequelize('smart_home',null, null,{
  host:'localhost',
  dialect: 'sqlite',
  storage: '',
  logging: false,
})

sequelize.authenticate()
  .then(() => {
    console.log('Conectado');
  })
  .catch(err => {
    console.log('No se conecto')
  })

module.exports = sequelize;