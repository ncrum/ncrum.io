import path from 'path'
import koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import koaError from 'koa-err'
import morgan from 'koa-morgan'
import less from 'koa-less';
import indexRoutes from './app/routes/index'

const app = koa()

app.use(bodyParser())
app.use(koaError())
app.use(morgan.middleware('dev'))
app.use(less(path.join(__dirname, 'client'), {
  force: true,
  debug: true
}))


app.use(serve(__dirname + '/client/styles'))
app.use(serve(__dirname + '/node_modules'))
if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, 'dist')))
}

indexRoutes(app)

app.listen(process.env.PORT || 8000)
