import 'babel-polyfill'
import path from 'path'
import compression from 'compression'
import express from 'express'

let app = express()
app.use(compression())
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/fonts', express.static(path.join(__dirname, 'static/fonts')))
app.use('/style', express.static(path.join(__dirname, 'static/style')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'))
})

app.listen(process.env.PORT || 3000)
