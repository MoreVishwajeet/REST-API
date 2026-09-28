const express = require('express');
const app = express();
const port = 8000;

const {connectMongoDb} = require('./connection');

const userRouter = require('./routes/user');

const {logReqRes} = require('./midlewares')   //-->no need to mention index.js bcs by default nodejs selects index.js only

//connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-db-1');

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));


//Routes
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server started at port ${port}`))