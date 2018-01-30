const debug = require('debug')('app:router')
const Router = require('koa-router')

const db = require('../database')
// const Op = db.Sequelize.Op

const app = new Router()

app.get('/', (ctx, next) => {
  debug('it the index')
  ctx.body = 'Hello, Pool Party'
})

app.get('/contracts', async (ctx, next) => {
  ctx.body = await db.contract.findAll()
})

app.get('/users', async (ctx, next) => {
  ctx.body = await db.user.findAll()
})

module.exports = app
