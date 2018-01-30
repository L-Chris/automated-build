import Koa from 'koa'
import {Nuxt, Builder} from 'nuxt'
import './mongodb'
import config from './config'
import middlewares from './middlewares'
import router from './routes'

const app = new Koa()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || config.server.port
const isProd = process.env.NODE_ENV === 'production'

let nuxtConfig = require('../nuxt.config')
nuxtConfig.dev = !(app.env === 'production')

const nuxt = new Nuxt(nuxtConfig)

if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

middlewares(app)
app.use(router.routes())
app.use(async (ctx, next) => {
  ctx.status = 200
  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      promise.then(resolve).catch(reject)
    })
  })
})
app.listen(port, host)