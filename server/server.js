const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log(error.message)
});


app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})

