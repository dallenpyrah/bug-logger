const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
app.use('/', serveStatic(path.join(__dirname, '/root')))
const port = process.env.PORT || 8080
app.listen(port)

// So since the npm run build doesnt make a dist or docs folder but a root one instead make sure you specify that here.
