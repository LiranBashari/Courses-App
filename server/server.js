const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();
const userRoutes = require("./routes/userRoutes")


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes)

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

