import dotenv from "dotenv";
import express from "express";

dotenv.config({
    "path":"./.env"
});
const app = express()
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.get("/" ,(req ,res) => {
    return res.send("Working...")
});

import movieroutes from "./routes/movie.route.js";
app.use("/api/v1/movie" ,movieroutes);

import castroutes from "./routes/cast.routes.js";
app.use("/api/v1/cast" ,castroutes);

app.listen(PORT ,() => console.log(`Server is running on PORT ${PORT}`));