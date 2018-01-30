const debug = require('debug')('app:router')
const Router = require('koa-router')

const db = require('../database')
// const Op = db.Sequelize.Op

const app = new Router()

app.get('/', (ctx, next) => {
  debug('it the index')
  ctx.body = 'Hello, Pool Party'
})

app.get('/pools', async (ctx) => {
  ctx.body = await db.contract.findAll()
})

app.post('/pools', async (ctx) => {
  // const { address, owner, name, description, links, heroImage, coinImage } = ctx.request.body
  // save it all
  ctx.body = { msg: 'ok!' }
})

app.get('/pools/:address', async (ctx) => {
  const { address } = ctx.params
  const pool = await db.contract.findOne({ where: { address } })
  if (!pool) ctx.throw(404)
  ctx.body = pool
})

app.put('/pools/:address', async (ctx) => {
  const { address } = ctx.params
  const pool = await db.contract.findOne({ where: { address } })
  if (!pool) ctx.throw(404)
  // verify ownerAddress & save the modifications
  ctx.body = pool
})

app.delete('/pools/:address', async (ctx) => {
  const { address } = ctx.params
  const pool = await db.contract.findOne({ where: { address } })
  if (!pool) ctx.throw(404)
  // verify ownerAddress and delete
  try {
    pool.destroy()
    ctx.body = { msg: `pool ${address} deleted` }
  } catch (err) {
    ctx.throw(500, err)
  }
})

app.get('/users', async (ctx) => {
  ctx.body = await db.user.findAll()
})

app.post('/users', async (ctx) => {
  ctx.body = { msg: 'ok!' }
})

app.get('/users/:address', async (ctx) => {
  const { address } = ctx.params
  const user = await db.user.findOne({ where: { address } })
  if (!user) ctx.throw(404)
  ctx.body = user
})

app.put('/users/:address', async (ctx) => {
  const { address } = ctx.params
  const user = await db.user.findOne({ where: { address } })
  if (!user) ctx.throw(404)
  // modify the user
  ctx.body = user
})

app.delete('/users/:address', async (ctx) => {
  const { address } = ctx.params
  const user = await db.user.findOne({ where: { address } })
  if (!user) ctx.throw(404)
  // verify
  try {
    user.destroy()
    ctx.body = { msg: `user ${address} deleted` }
  } catch (err) {
    ctx.throw(500, err)
  }
})

module.exports = app
