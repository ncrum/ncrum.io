import 'babel-polyfill'
import path from 'path'
import koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import koaError from 'koa-error'
import morgan from 'koa-morgan'
import less from 'koa-less'
import web from './web'

const app = koa()

app.use(bodyParser())
app.use(koaError())
app.use(morgan.middleware('dev'))

let stylePath = path.join(__dirname, '../site/styles')
app.use(less(stylePath))
app.use(serve(stylePath))
app.use(serve(path.join(process.cwd(), 'node_modules/highlight.js/styles')))

web(app)

app.listen(process.env.PORT || 3000)
