const express = require('express');
const port = process.env.PORT;
const userRouter = require('./routes/user');
const questionRouter = require('./routes/question');
const indexRouter = require('./routes/index');
const app = express();
require('./db/db');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
app.use(questionRouter);
app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`Server running on port  ${port}`);
});
