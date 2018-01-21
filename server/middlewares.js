import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import config from './config'

export default (app) => {
  app.use(async (ctx, next) => {
    try {
      await next()
      if (ctx.status === 404 && ctx.res.headersSent === false) {
        ctx.throw(404)
      }
      if (ctx.status === 200 && ctx.res.headersSent === false) {
        ctx.body = {
          status: 200,
          data: ctx.body
        }
      }
    } catch (err) {
      ctx.status = err.status || 500
      ctx.type = 'json'
      ctx.body = {
        status: ctx.status,
        message: err.message
      }
      ctx.app.emit('error', err, ctx)
    }
  })
  app.use(bodyParser())
}