const express = require('express')
const port = process.env.PORT
const userRouter = require('./routes/user')
const indexRouter = require('./routes/index');
require('./db/db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(userRouter)
app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`Server running on port  ${port}`)
})