import path from 'path'
import compression from 'compression'
import express from 'express'
import serve from 'serve-static'

let app = express()
app.use(compression())
app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'))
})

app.listen(3000)