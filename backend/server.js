const express = require('express')
const path = require('path')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = 3000;

app.use(cors()); 
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(routes)

app.listen(port)
