const Sequelize = require('sequelize')

const sequelize = new Sequelize('smart_house', 'root', null, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
})
/*
sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })
*/
module.exports = sequelize;