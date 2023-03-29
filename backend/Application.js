if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const connectmongo = require("./Databaseconnection")
connectmongo();

const cors = require("cors");
const port = process.env.PORT_Server;
//! middleware used in the app
app.use(cors());
app.use(express.json());
//Available ROutes
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/shop", require("./Routes/shop"));
app.use("/api/payment" , require("./Routes/payment"));
app.use("/uploads", express.static("uploads"));

//! listening   port 
app.listen(port, () => {
    console.log("listining to the ", port);
})
