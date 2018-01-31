const debug = require('debug')('app:router')
const Router = require('koa-router')
const eth = require('ethjs')
// const Wallet = require('ethers-wallet').Wallet
// const fecha = require('fecha')

const db = require('../database')
// const Op = db.Sequelize.Op

const app = new Router()

function checkAddress (ctx, address) {
  if (!eth.isAddress(address)) {
    ctx.throw(400, 'Invalid ETH address')
  }
}

app.get('/', (ctx) => {
  debug('it the index')
  ctx.body = '<h1>Join the pool party 🏊🏽‍♀️</h1>'
})

// app.get('/sig/:sig', async (ctx) => {
//   const { sig } = ctx.params
//   const msg = fecha.format(new Date(), 'YYYY-MM-DD')
//   const address = Wallet.verifyMessage(msg, sig)
//   ctx.body = address
// })

app.get('/pools', async (ctx) => {
  ctx.body = await db.contract.findAll()
})

app.post('/pools', async (ctx) => {
  const {
    address,
    ownerAddress,
    name,
    description,
    heroImage,
    coinImage,
    symbol,
    type,
    base,
    baseToken,
    links
  } = ctx.request.body

  let pool = await db.contract.create({
    address,
    ownerAddress,
    name,
    description,
    heroImage,
    coinImage,
    symbol,
    type,
    base,
    baseToken,
    links
  }, {
    include: [{ model: db.link }]
  })
  ctx.body = pool
})

app.get('/pools/:address', async (ctx) => {
  const { address } = ctx.params
  checkAddress(ctx, address)
  const pool = await db.contract.findOne({ where: { address } })
  if (!pool) ctx.throw(404)
  ctx.body = pool
})

app.put('/pools/:address', async (ctx) => {
  const { address } = ctx.params
  checkAddress(ctx, address)

  // check request validity
  // const { authorization } = ctx.request.headers
  // if (!authorization) ctx.throw(401)
  // const token = authorization.replace('Basic ', '')
  // const msg = fecha.format(new Date(), 'YYYY-MM-DD')
  // let signedAddress = Wallet.verifyMessage(msg, token)
  // if (signedAddress !== address) ctx.throw(401)

  const pool = await db.contract.findOne({ where: { address } })
  if (!pool) ctx.throw(404)
  // make sure ownerAddress matches header signature
  const allowed = ['name', 'description', 'heroImage', 'coinImage']
  const fields = allowable(ctx.request.body, allowed)
  await pool.update(ctx.request.body, { fields })
  ctx.body = pool
})

function allowable (obj, allowed) {
  let remaining = []
  for (let key of Object.keys(obj)) {
    if (allowed.indexOf(key) < 0) {
      delete obj[key]
    } else {
      remaining.push(key)
    }
  }
  return remaining
}

app.delete('/pools/:address', async (ctx) => {
  const { address } = ctx.params
  checkAddress(ctx, address)
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
  const { address } = ctx.request.body
  checkAddress(ctx, address)
  ctx.body = 'um'
})

app.get('/users/:address', async (ctx) => {
  const { address } = ctx.params
  checkAddress(ctx, address)
  const user = await db.user.findOne({ where: { address } })
  if (!user) ctx.throw(404)
  ctx.body = user
})

app.put('/users/:address', async (ctx) => {
  const { address } = ctx.params
  checkAddress(ctx, address)
  const user = await db.user.findOne({ where: { address } })
  if (!user) ctx.throw(404)
  // modify the user
  ctx.body = user
})

app.delete('/users/:address', async (ctx) => {
  const { address } = ctx.params
  checkAddress(ctx, address)
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
