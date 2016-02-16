import path from 'path'
import koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import koaError from 'koa-err'
import morgan from 'koa-morgan'
import less from 'koa-less';
import indexRoutes from './app/routes/index'
import apiRoutes from './app/routes/api'

import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL || '127.0.0.1:27017')

const app = koa()

app.use(bodyParser())
app.use(koaError())
app.use(morgan.middleware('dev'))
app.use(less(path.join(__dirname, 'client'), {
  force: true,
  debug: true
}))


app.use(serve(__dirname + '/client'))
app.use(serve(__dirname + '/node_modules'))

apiRoutes(app)
indexRoutes(app, path.join(__dirname, 'client/views/index.html'))

app.listen(process.env.PORT || 80)
