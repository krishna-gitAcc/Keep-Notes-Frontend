const connectToMongo = require('./db');

const cors = require('cors')

const express = require('express')
const app = express()

require("dotenv").config();

const port = 5000

app.use(express.json())
app.use(cors());

connectToMongo();


// Available Routes
app.get("/",(req,res)=>{
    res.send("hello from home route");
})
app.use("/api/auth",require('./routes/auth'));
app.use('/api/notes', require("./routes/notes"));



app.listen(process.env.PORT || port, () => {
    console.log(`iNotebook backend listening on port ${process.env.PORT || port}`);
})