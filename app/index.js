const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('app:index')

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  debug(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(ctx => {
  ctx.body = 'Hello world!'
})

app.listen(3000)

/*
require('dotenv').config()
const debug = require('debug')('app:index')
const path = require('path')
const appError = require('debug')('app:ERROR')

const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')
const serve = require('koa-static')

const session = require('koa-session')
// const redisStore = require('koa-redis')
// const convert = require('koa-convert')

const bodyparser = require('koa-bodyparser')

const passport = require('koa-passport')

app.keys = ['hhoijlkjdfa', 'hoihjhkjlkj', 'ju09hlkjlkjsdf']

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  debug(`[${ctx.status}] ${ctx.method} ${ctx.url}  ~ ${ms}ms`)
  ctx.set('X-Response-Time', `${ms} ms`)
})

app.use(serve(path.join(__dirname, '/public')))

app.use(session({
  key: 'objct',
  overwrite: true,
  httpOnly: true,
  signed: true
}, app))

// auth
app.use(passport.initialize())
app.use(passport.session())
require('./platform/config/auth')

app.use(bodyparser())

app.use(cors({
  origin: 'https://www.objctify.io',
  credentials: true
}))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    appError(err.toString())
    ctx.status = err.status || 500
    ctx.body = err.message
    // ctx.app.emit('error', err, { user })
  }
})

const index = require('./platform/routes')
app.use(index.routes())
app.use(index.allowedMethods())

const search = require('./platform/routes/search')
app.use(search.routes())
app.use(search.allowedMethods())

const projects = require('./platform/routes/projects')
app.use(projects.routes())
app.use(projects.allowedMethods())

const accounts = require('./platform/routes/accounts')
app.use(accounts.routes())
app.use(accounts.allowedMethods())

const files = require('./platform/routes/files')
app.use(files.routes())
app.use(files.allowedMethods())

const httpErrors = require('./platform/routes/http-errors')
app.use(httpErrors.routes())
app.use(httpErrors.allowedMethods())

app.listen(process.env.PORT || 3000)
debug(`App available on ${process.env.PORT}`)
*/

