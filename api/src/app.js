const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());


//routes
var todos = require('./routes/todos')

app.use('/todos', todos);


app.listen(PORT, () => {
    console.log('Server is running at port 3000');
});
