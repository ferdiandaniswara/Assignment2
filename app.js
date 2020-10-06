const express = require('express');
const mongooseConnect = require('./config/mongoose')
const routes = require('./routes');
const morgan = require('morgan');
const helmet = require('helmet')

const app = express();
const port = 3000;

mongooseConnect();


app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);


app.listen(port, ()=>{
    console.log(`Apps running on http://localhost:${port}`)
})